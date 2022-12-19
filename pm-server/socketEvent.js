import uniqid from 'uniqid'
import SocketService from './services/socket.service.js'
import { createNotification } from './controllers/notification.controller.js'
import databaseData from './models/data/index.js'

const socketEvent = (io) => {
  io.on('connection', (socket) => {
    console.log('CONNECTED 😎: ', socket.id)
    socket.on('initUser', async ({ userId }, callback) => {
      const { user, error } = await SocketService.initUser({ userId: userId, id: socket.id })
      if (error) return callback(error)
      console.log('INIT USER 🤖:', user)
    })
    // 
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
        const users = await SocketService.addUsersSendNotificationMessage({ conversationId: conversationId })
        console.log(`📨 Sent message from to ${conversationId} with content: ${messageContent}`)
        io.to(conversationId).emit('message', message)
        users.map(async (user) => {
          const notification = {
            notification_content: `You have a new message from ${userInfo.first_name} ${userInfo.last_name}`,
            type: 'message',
            to_user_id: user.userId,
            from_user: {
              id: userInfo.id,
              username: userInfo.username,
            },
            route: `/inbox/${conversationId}`,
            is_read: false,
          }
          io.to(user.id).emit('notification', notification)
          const notificationToSave = {
            notification_content: `You have a new message from ${userInfo.first_name} ${userInfo.last_name}`,
            type: 'message',
            to_user_id: user.userId,
            from_user_id: userInfo.id,
            route: `/inbox/${conversationId}`,
            is_read: false,
          }
          await createNotification(notificationToSave)
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
    socket.on('inviteToTeam', async ({ listMembersId, teamInfo, userInfo }, callback) => {
      try {
        const users = await SocketService.getUsersToSendNotification({ userIds: listMembersId })
        users.map(async (user) => {
          const notification = {
            notification_content: `You have been invited to team ${teamInfo.name}`,
            type: 'inviteTeamMember',
            to_user_id: user.userId,
            from_user: {
              id: userInfo.id,
              username: userInfo.username,
            },
            from_user_id: userInfo.id,
            route: `/teams/${teamInfo.id}`,
            is_read: false,
          }
          io.to(user.id).emit('notification', notification)
        });
        const notifications = listMembersId.map((memberId) => {
          return {
            notification_content: `You have been invited to team ${teamInfo.name}`,
            type: 'inviteTeamMember',
            to_user_id: memberId,
            from_user_id: userInfo.id,
            route: `/teams/${teamInfo.id}`,
            is_read: false,
          }
        })
        await databaseData.notification.bulkCreate(notifications)
      } catch (error) {
        callback(error)
      }
    })
    socket.on('newProject', async ({ listMembersId, teamInfo, userInfo }, callback) => {
      try {
        const users = await SocketService.getUsersToSendNotification({ userIds: listMembersId })
        users.map(async (user) => {
          const notification = {
            notification_content: `New project has been created in team ${teamInfo.name}`,
            type: 'newProject',
            to_user_id: user.userId,
            from_user: {
              id: userInfo.id,
              username: userInfo.username,
            },
            from_user_id: userInfo.id,
            route: `/teams/${teamInfo.id}`,
            is_read: false,
          }
          io.to(user.id).emit('notification', notification)
        });
        const notifications = listMembersId.map((memberId) => {
          return {
            notification_content: `New project has been created in team ${teamInfo.name}`,
            type: 'newProject',
            to_user_id: memberId,
            from_user_id: userInfo.id,
            route: `/teams/${teamInfo.id}`,
            is_read: false,
          }
        })
        await databaseData.notification.bulkCreate(notifications)
      } catch (error) {
        callback(error)
      }
    })
    socket.on('removeTeamMember', async ({ to_user_id, teamInfo, userInfo }, callback) => {
      try {
        const user = await SocketService.getUserToSendNotification({ userId: to_user_id })
        const notification = {
          notification_content: `You have been removed from team ${teamInfo.name}`,
          type: 'removeTeamMember',
          to_user_id: user.userId,
          from_user: {
            id: userInfo.id,
            username: userInfo.username,
          },
          route: `/teams/${teamInfo.id}`,
          is_read: false,
        }
        io.to(user.id).emit('notification', notification)
        const notificationToSave = {
          notification_content: `You have been removed from team ${teamInfo.name}`,
          type: 'removeTeamMember',
          to_user_id: to_user_id,
          from_user_id: userInfo.id,
          route: `/teams/${teamInfo.id}`,
          is_read: false,
        }
        await createNotification(notificationToSave)
      } catch (error) {
        callback(error)
      }
    })
    socket.on('promoteTeamMember', async ({ to_user_id, teamInfo, userInfo }, callback) => {
      try {
        const user = await SocketService.getUserToSendNotification({ userId: to_user_id })
        const notification = {
          notification_content: `You have been promoted to admin in team ${teamInfo.name}`,
          type: 'promoteTeamMember',
          to_user_id: user.userId,
          from_user: {
            id: userInfo.id,
            username: userInfo.username,
          },
          route: `/teams/${teamInfo.id}`,
          is_read: false,
        }
        io.to(user.id).emit('notification', notification)
        const notificationToSave = {
          notification_content: `You have been promoted to admin in team ${teamInfo.name}`,
          type: 'promoteTeamMember',
          to_user_id: to_user_id,
          from_user_id: userInfo.id,
          route: `/teams/${teamInfo.id}`,
          is_read: false,
        }
        await createNotification(notificationToSave)
      } catch (error) {
        callback(error)
      }
    })
    socket.on('sendNotificationtoMember', async ({ userInfo, to_user_id, route, notification_content, type }, callback) => {
      try {
        const user = await SocketService.getUserToSendNotification({ userId: to_user_id })
        const notification = {
          notification_content: notification_content,
          type: type,
          to_user_id: user.userId,
          from_user: {
            id: userInfo.id,
            username: userInfo.username,
          },
          route: route,
          is_read: false,
        }
        io.to(user.id).emit('notification', notification)
        const notificationToSave = {
          notification_content: notification_content,
          type: type,
          to_user_id: to_user_id,
          from_user_id: userInfo.id,
          route: route,
          is_read: false,
        }
        await createNotification(notificationToSave)
      } catch (error) {
        callback(error)
      }
    })
    socket.on('sendNewTask', async ({ to_user_id, projectInfo, userInfo }, callback) => {
      try {
        const user = await SocketService.getUserToSendNotification({ userId: to_user_id })
        const notification = {
          notification_content: `You have been assigned a new task in project ${projectInfo.name}`,
          type: 'sendNewTask',
          to_user_id: user.userId,
          from_user: {
            id: userInfo.id,
            username: userInfo.username,
          },
          route: `/teams/${teamInfo.id}`,
          is_read: false,
        }
        io.to(user.id).emit('notification', notification)
        const notificationToSave = {
          notification_content: `You have been promoted to admin in team ${teamInfo.name}`,
          type: 'promoteTeamMember',
          to_user_id: to_user_id,
          from_user_id: userInfo.id,
          route: `/teams/${teamInfo.id}`,
          is_read: false,
        }
        await createNotification(notificationToSave)
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


