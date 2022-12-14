const groupUserModel = (sequelize, Sequelize) => {
  const GroupUser = sequelize.define('group_user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    is_admin: {
      type: Sequelize.BOOLEAN
    }
  })
  return GroupUser
}
export default groupUserModel