import databaseConfig from "../configs/db.config.js";
import { Sequelize } from "sequelize";
// import Models
import userModel from "./user.model.js"
import teamModel from "./team.model.js"
import teamMemberModel from "./teamMember.model.js"
import projectModel from "./project.model.js"
import taskModel from "./task.model.js"
import commentModel from "./comment.model.js"
import commentReactionModel from "./commentReaction.model.js"
import conversationModel from "./conversation.model.js"
import messageModel from "./message.model.js"
import messageReactionModel from "./messageReaction.model.js"
import groupUserModel from "./groupUser.model.js"

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

const database = {} // Object to hold all models
database.Sequelize = Sequelize
database.sequelize = sequelize

database.user = userModel(sequelize, Sequelize)
database.team = teamModel(sequelize, Sequelize)
database.teamMember = teamMemberModel(sequelize, Sequelize)
database.project = projectModel(sequelize, Sequelize)
database.task = taskModel(sequelize, Sequelize)
database.comment = commentModel(sequelize, Sequelize)
database.commentReaction = commentReactionModel(sequelize, Sequelize)
database.conversation = conversationModel(sequelize, Sequelize)
database.message = messageModel(sequelize, Sequelize)
database.messageReaction = messageReactionModel(sequelize, Sequelize)
database.groupUser = groupUserModel(sequelize, Sequelize)

/**
 * Relationships
 */

// User - Team
database.user.belongsToMany(database.team, {
  through: database.teamMember,
  foreignKey: "user_id",
  otherKey: "team_id"
})

database.team.belongsToMany(database.user, {
  through: database.teamMember,
  foreignKey: "team_id",
  otherKey: "user_id"
})

// Team - Project (1:N)
database.team.hasMany(database.project, {
  foreignKey: "team_id",
  as: "project"
})

// Project - Task (1:N)
database.project.hasMany(database.task, {
  foreignKey: "project_id",
  as: "task"
})

// Task - Task (1:N)
database.task.hasMany(database.task, {
  foreignKey: "task_id",
  as: "subtask"
})

// Task - Comment (1:N)
database.task.hasMany(database.comment, {
  foreignKey: "task_id",
  as: "comment"
})

// User - Comment (1:N)
database.user.hasMany(database.comment, {
  foreignKey: "user_id",
  as: "comment"
})

// Comment - Comment_reaction (1:N)
database.comment.hasMany(database.commentReaction, {
  foreignKey: "comment_id",
  as: "comment_reaction"
})

// User - Comment_reaction (1:N)
database.user.hasMany(database.commentReaction, {
  foreignKey: "user_id",
  as: "comment_reaction"
})

// User - Conversation (N:N)
database.user.belongsToMany(database.conversation, {
  through: database.groupUser,
  foreignKey: "user_id",
  otherKey: "conversation_id"
})

database.conversation.belongsToMany(database.user, {
  through: database.groupUser,
  foreignKey: "conversation_id",
  otherKey: "user_id"
})

// Conversation - Message (1:N)
database.conversation.hasMany(database.message, {
  foreignKey: "conversation_id",
  as: "message"
})

// Message - Message_reaction (1:N)
database.message.hasMany(database.messageReaction, {
  foreignKey: "message_id",
  as: "message_reaction"
})

// User - Message_reaction (1:N)
database.user.hasMany(database.messageReaction, {
  foreignKey: "user_id",
  as: "message_reaction"
})

export default database