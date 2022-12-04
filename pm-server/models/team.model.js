const teamModel = (sequelize, Sequelize) => {
  const Team = sequelize.define('team', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
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