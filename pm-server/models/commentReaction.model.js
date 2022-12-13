const commentReactionModel = (sequelize, Sequelize) => {
  const CommentReaction = sequelize.define('comment_reaction', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reaction_id: {
      type: Sequelize.INTEGER
    }
  })
  return CommentReaction
}
export default commentReactionModel