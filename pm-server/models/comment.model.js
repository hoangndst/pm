const commentModel = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    comment_content: {
      type: Sequelize.STRING
    }
  })
  return Comment
}
export default commentModel