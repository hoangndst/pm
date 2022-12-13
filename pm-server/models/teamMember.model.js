const teamMemberModel = (sequelize, Sequelize) => {
  const TeamMember = sequelize.define('team_member', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
  return TeamMember
}
export default teamMemberModel