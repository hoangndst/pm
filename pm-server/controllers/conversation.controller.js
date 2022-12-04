import database from "../models/index.js"
import uniqid from "uniqid"
import { Op } from "sequelize"

// insert new conversation for user
export const createConversation = async (req, res) => {
  const conversationId = uniqid()  // const teamID = uniqid()
  const userId1 = req.body.userId1 // const userId = req.body.userId
  const userId2 = req.body.userId2  
  const conversationName = req.body.conversationName
  const conversation = {
    id: conversationId,
    conversation_name: conversationName
  }
  const groupUser1 = {
    is_admin: true,
    conversation_id: conversationId,
    user_id: userId1,
    joined_at: new Date()
  }
  const groupUser2 = {
    is_admin: false,
    conversation_id: conversationId,
    user_id: userId2,
    joined_at: new Date()
  }
  try {
    await database.conversation.create(conversation)
    await database.groupUser.create(groupUser1)
    await database.groupUser.create(groupUser2)
    res.status(200).send({
      message: "Conversation created successfully",
      conversationId: conversationId
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
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
            attributes: ["is_admin", "joined_at"],
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
