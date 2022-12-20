import database from "../models/data/index.js"
import uniqid from "uniqid"
import { Op } from "sequelize"

// insert new conversation for users or existing conversation
export const insertConversationToDatabase = async (users, conversationName) => {
  const conversationId = uniqid()
  const conversation = {
    id: conversationId,
    conversation_name: conversationName
  }
  const groupUsers = users.map((user, index) => {
    return {
      conversation_id: conversationId,
      user_id: user,
      is_admin: index === 0 ? true : false
    }
  })
  const initialMessage = {
    id: uniqid(),
    message_content: "Hello",
    from_user_id: users[0],
    conversation_id: conversationId
  }
  await database.conversation.create(conversation)
  await database.groupUser.bulkCreate(groupUsers)
  await database.message.create(initialMessage)
  return conversationId
}

export const createConversation = async (req, res) => {
  const users = req.body.users
  const conversationName = req.body.conversationName
  const response = {}
  try {
    if (users.length === 2) {
      const userConversations = await getConversationByUserId(users[0])
      if (userConversations) {
        for (let i = 0; i < userConversations.conversations.length; i++) {
          const conversation = userConversations.conversations[i]
          if (conversation.users.length === users.length && conversation.users.every(user => users.includes(user.id))) {
            response.conversationId = conversation.id
            response.isNewConversation = false
            break
          }
        }
        if (!response.conversationId) {
          const conversationId = await insertConversationToDatabase(users, conversationName)
          response.conversationId = conversationId
          response.isNewConversation = true
        } else {
          response.isNewConversation = false
        }
      } else {
        const conversationId = await insertConversationToDatabase(users, conversationName)
        response.conversationId = conversationId
        response.isNewConversation = true
      }
    } else {
      const conversationId = await insertConversationToDatabase(users, conversationName)
      response.conversationId = conversationId
      response.isNewConversation = true
    }
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

// get Conversation by user id
const getConversationByUserId = async (userId) => {
  const userConversations = await database.user.findOne({
    where: {
      id: userId
    },
    attributes: ["id", "username"],
    include: [
      {
        model: database.conversation,
        as: "conversations",
        attributes: ["id", "conversation_name"],
        through: {
          attributes: []
        },
        include: [
          {
            model: database.user,
            as: "users",
            attributes: ["id"],
            through: {
              attributes: []
            }
          }
        ],
      }
    ]
  })
  return userConversations
}

// get all conversations,conversation members and last message for user and sort by last message time
export const getConversations = async (req, res) => {
  const userId = req.query.userId
  try {
    const userConversations = await database.user.findOne({
      where: {
        id: userId
      },
      attributes: ["id", "username", "first_name", "last_name"],
      include: [
        {
          model: database.conversation,
          as: "conversations",
          attributes: ["id", "conversation_name"],
          through: {
            attributes: ["is_admin", "createdAt"],
            as: "permissions"
          },
          include: [
            {
              model: database.user,
              where: {
                id: {
                  [Op.ne]: userId
                }
              },
              as: "users",
              attributes: ["id", "username", "email", "first_name", "last_name"],
              through: {
                attributes: []
              }
            },
            {
              model: database.message,
              as: "message",
              attributes: ["id", "message_content", "from_user_id", "conversation_id", "createdAt"],
              order: [["createdAt", "DESC"]],
              limit: 1
            }
          ],
        }
      ]
    })
    if (userConversations) {
      userConversations.conversations.sort((a, b) => {
        return new Date(b.message[0].createdAt) - new Date(a.message[0].createdAt)
      })
    }
    res.status(200).send(userConversations)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

export const checkConversationExistByUsername = async (username, conversationId) => {
  const conversation = await database.conversation.findOne({
    where: {
      id: conversationId
    },
    attributes: ["id"],
    include: [
      {
        model: database.user,
        as: "users",
        attributes: ["id", "username"],
        through: {
          attributes: []
        }
      }
    ]
  })
  if (conversation) {
    const user = conversation.users.find(user => user.username === username)
    if (user) {
      return true
    }
  }
  return false
}

export const checkConversationExistByUserId = async (userId, conversationId) => {
  const conversation = await database.conversation.findOne({
    where: {
      id: conversationId
    },
    attributes: ["id"],
    include: [
      {
        model: database.user,
        as: "users",
        attributes: ["id", "username"],
        through: {
          attributes: []
        }
      }
    ]
  })
  if (conversation) {
    const user = conversation.users.find(user => user.id === userId)
    if (user) {
      return true
    }
  }
  return false
}

export const getUsersByConversationId = async (conversationId) => {
  const conversation = await database.conversation.findOne({
    where: {
      id: conversationId
    },
    attributes: ["id"],
    include: [
      {
        model: database.user,
        as: "users",
        attributes: ["id", "username"],
        through: {
          attributes: []
        }
      }
    ]
  })
  if (conversation) {
    return conversation.users
  }
  return []
}