import databaseConfig from "../configs/db.config";
import { Sequelize } from "sequelize";
import roleMole from "./role.model";
import userModel from "./user.model";

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
database.roles = roleMole(sequelize, Sequelize)

database.roles.belongsToMany(database.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})

database.users.belongsToMany(database.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
})

database.ROLES = ["user", "admin", "moderator"]

export default database