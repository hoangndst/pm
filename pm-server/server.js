import express from 'express'
import cors from 'cors'
const app = express()
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Server } from 'socket.io'
import databaseData from './models/data/index.js'
import databaseAuth from './models/auth/index.js'
import routes from './routes/index.js'
import socketEvent from './socketEvent.js'

env.config()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const Role = databaseAuth.roles

databaseData.sequelize.sync({ }).then(() => {
  console.log('Synced with database data')
}).catch((err) => {
  console.log('Error syncing with database data', err)
})

databaseAuth.sequelize.sync({ }).then(() => {
  console.log('Synced with database auth')
  //initial()
}).catch((err) => {
  console.log('Error syncing with database auth', err)
})

const initial = () => {
  Role.create({
    id: 1,
    name: 'user'
  })
  Role.create({
    id: 2,
    name: 'moderator'
  })
  Role.create({
    id: 3,
    name: 'admin'
  })
}

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

socketEvent(io)
