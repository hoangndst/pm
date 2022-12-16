import uniqid from 'uniqid'
import SocketService from './services/socket.service.js'
import databaseData from './models/data/index.js'

const socketEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('CONNECTED 😎: ', socket.id)
    socket.on('initUser', async ({ userId }, callback) => {
      const { user, error } = await SocketService.initUser({ userId: userId, id: socket.id })
      if (error) return callback(error)
      console.log('INIT USER 🤖:', user)
    })
    socket.on('join', async ({ userInfo, conversationId }, callback) => {
      const { user, error } = await SocketService.addUser({ id: socket.id, userInfo, conversationId });
      if (error) return callback(error)
      console.log(socket.rooms)
      socket.join(conversationId)
      console.log('JOIN CONVERSATION 📬: ', user)
      console.log(socket.rooms)
      callback()
    })
    socket.on('leave', async ({ conversationId }, callback) => {
      socket.leave(conversationId)
      console.log('LEAVE CONVERSATION 😶‍🌫️: ', conversationId, socket.rooms)
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
        const users = await SocketService.addUsersSendNotificationMessage({ conversationId: conversationId})
        console.log(`📨 Sent message from to ${conversationId} with content: ${messageContent}`)
        io.to(conversationId).emit('message', message)
        users.map((user) => {
          const notification = {
            notification_content: `You have a new message from ${userInfo.first_name} ${userInfo.last_name}`,
            type: 'message',
            to_user_id: user.userId,
            from_user: {
              id: userInfo.id,
              username: userInfo.username,
            },
            route: `/inbox/${conversationId}`
          }
          io.to(user.id).emit('notification', notification)
          // databaseData.notification.create(notification)
          console.log(`🔔 SENT MESSAGE NOTIFICATION TO: `, user.userId)
        })
        console.log(`📦 Rooms:`, socket.rooms)
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
        console.log('LEFT 🦴:', user)
      }
    })
  });
}

export default socketEvent


