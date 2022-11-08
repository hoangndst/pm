const messageModel = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    message_content: {
      type: Sequelize.STRING
    },
    from_user_id: {
      type: Sequelize.INTEGER
    },
  })
  return Message
}
export default messageModel