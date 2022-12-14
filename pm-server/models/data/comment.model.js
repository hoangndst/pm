const commentModel = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    comment_content: {
      type: Sequelize.TEXT
    }
  })
  return Comment
}
export default commentModel