const groupUserModel = (sequelize, Sequelize) => {
  const GroupUser = sequelize.define('group_user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    is_admin: {
      type: Sequelize.BOOLEAN
    },
    conversation_id: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING
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