const userModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    birth_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
  return User
}
export default userModel