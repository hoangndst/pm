const messageReactionModel = (sequelize, Sequelize) => {
  const MessageReaction = sequelize.define('message_reaction', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reaction: {
      type: Sequelize.INTEGER
    }
  })
  return MessageReaction
}
export default messageReactionModel