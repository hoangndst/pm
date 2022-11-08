import databaseConfig from "../configs/db.config.js";
import { Sequelize } from "sequelize";
import roleModel from "./role.model.js";
import userModel from "./user.model.js";
import refreshTokensModel from "./refreshTokens.model.js";

const sequelize = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle
    }
  }
)

const database = {}
database.Sequelize = Sequelize
database.sequelize = sequelize

database.users = userModel(sequelize, Sequelize)
database.roles = roleModel(sequelize, Sequelize)
database.refreshTokens = refreshTokensModel(sequelize, Sequelize)

database.roles.belongsToMany(database.users, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
})

database.users.belongsToMany(database.roles, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
})

database.users.hasOne(database.refreshTokens, {
  foreignKey: "user_id",
  as: "refreshToken"
})

database.ROLES = ["user", "admin", "moderator"]

export default database