const userModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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
      type: Sequelize.DATE
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
  return User
}
export default userModel