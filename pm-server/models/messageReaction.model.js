const messageReactionModel = (sequelize, Sequelize) => {
  const MessageReaction = sequelize.define('message_reaction', {
    reaction_id: {
      type: Sequelize.INTEGER
    }
  })
  return MessageReaction
}
export default messageReactionModel