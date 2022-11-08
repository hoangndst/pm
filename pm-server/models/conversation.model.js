const conversationModel = (sequelize, Sequelize) => {
  const Conversation = sequelize.define('conversation', {
    conversation_name: {
      type: Sequelize.STRING
    }
  })
  return Conversation
}
export default conversationModel