const conversationModel = (sequelize, Sequelize) => {
  const Conversation = sequelize.define('conversation', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true  
    },
    conversation_name: {
      type: Sequelize.STRING
    }
  })
  return Conversation
}
export default conversationModel