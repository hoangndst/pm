import express from 'express'
import cors from 'cors'
const app = express()
import uniqid from 'uniqid'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Server } from 'socket.io'
import SocketService from './services/socket.service.js'
import databaseData from './models/data/index.js'
import databaseAuth from './models/auth/index.js'
import routes from './routes/index.js'

env.config()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000

databaseData.sequelize.sync({}).then(() => {
  console.log('Synced with database data')
}).catch((err) => {
  console.log('Error syncing with database data', err)
})

databaseAuth.sequelize.sync({}).then(() => {
  console.log('Synced with database auth')
}).catch((err) => {
  console.log('Error syncing with database auth', err)
})

// routes
routes(app)

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

io.on('connection', (socket) => {
  console.log('New user connected')
  socket.on('join', async ({ userInfo, conversationId }, callback) => {
    const { user, error } = await SocketService.addUser({ id: socket.id, userInfo, conversationId });
    if (error) return callback(error)
    socket.join(user.conversationId)
    console.log(`${user.userInfo.username} joined ${user.conversationId}`)
    callback()
  })
  socket.on('sendMessage', async ({ messageContent, conversationId, userInfo }, callback) => {
    try {
      const id = uniqid()
      const message = {
        id: id,
        message_content: messageContent,
        from_user_id: userInfo.id,
        conversation_id: conversationId,
        createdAt: new Date(),
        user: {
          id: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
        }
      }
      console.log(`sent message from to ${conversationId} with content: ${messageContent}`)
      io.to(conversationId).emit('message', message)
      console.log(`rooms:`, socket.rooms)
      const messageToSave = {
        id: message.id,
        message_content: message.message_content,
        from_user_id: message.from_user_id,
        conversation_id: message.conversation_id,
        createdAt: message.createdAt
      }
      await databaseData.message.create(messageToSave)
      callback()
    } catch (error) {
      callback(error)
    }
  })
  socket.on('disconnect', () => {
    const user = SocketService.removeUser(socket.id)
    if (user) {
      console.log(`${user.userInfo.username} left ${user.conversationId}`)
    } else {
      console.log('No user found')
    }
  })
});