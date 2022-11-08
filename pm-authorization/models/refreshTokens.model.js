const refreshTokensModel = (sequelize, Sequelize) => {
  const RefreshTokens = sequelize.define("refresh_tokens", {
    token: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    }
  })
  return RefreshTokens
}
export default refreshTokensModel