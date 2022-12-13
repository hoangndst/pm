const refreshTokensModel = (sequelize, Sequelize) => {
  const RefreshTokens = sequelize.define("refresh_tokens", {
    token: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.STRING
    }
  })
  return RefreshTokens
}
export default refreshTokensModel