const groupUserModel = (sequelize, Sequelize) => {
  const GroupUser = sequelize.define('group_user', {
    is_admin: {
      type: Sequelize.BOOLEAN
    },
    joined_at: {
      type: Sequelize.DATE
    },
    left_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  })
  return GroupUser
}
export default groupUserModel