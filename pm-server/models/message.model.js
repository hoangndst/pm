const messageModel = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_content: {
      type: Sequelize.STRING
    },
    from_user_id: {
      type: Sequelize.STRING
    },
    conversation_id: {
      type: Sequelize.STRING
    }
  })
  return Message
}
export default messageModel