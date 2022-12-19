const messageModel = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    message_content: {
      type: Sequelize.TEXT
    },
    from_user_id: {
      type: Sequelize.STRING
    }
  })
  return Message
}
export default messageModel