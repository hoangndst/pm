const commentReactionModel = (sequelize, Sequelize) => {
  const CommentReaction = sequelize.define('comment_reaction', {
    reaction_id: {
      type: Sequelize.INTEGER
    }
  })
  return CommentReaction
}
export default commentReactionModel