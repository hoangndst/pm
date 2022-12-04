import database from "../models/index.js"
import { Op } from "sequelize"

export const createMessage = async (req, res) => {
  const messageContent = req.body.messageContent
  const fromUserId = req.body.fromUserId
  const conversationId = req.body.conversationId
  const message = {
    message_content: messageContent,
    from_user_id: fromUserId,
    conversation_id: conversationId
  }
  try {
    await database.message.create(message)
    res.status(200).send({
      message: "Message created successfully"
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

// get all messages and users info for conversation
export const getMessages = async (req, res) => {
  const conversationId = req.query.conversationId
  try {
    const messages = await database.message.findAll({
      where: {
        conversation_id: conversationId
      },
      attributes: ["id", "message_content", "from_user_id", "conversation_id", "createdAt"],
    })
    const users = await database.user.findAll({
      attributes: ["id", "username", "first_name", "last_name", "avatar"],
      where: {
        id: {
          [Op.in]: messages.map(message => message.from_user_id)
        }
      }
    })
    const messagesWithUsers = messages.map(message => {
      const user = users.find(user => user.id === message.from_user_id)
      return {
        ...message.dataValues,
        user
      }
    })
    res.status(200).send(messagesWithUsers)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}