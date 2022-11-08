const teamModel = (sequelize, Sequelize) => {
  const Team = sequelize.define('team', {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
  return Team
}
export default teamModel