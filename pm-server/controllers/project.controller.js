import database from "../models/data/index.js";
import uniqid from "uniqid";
import { Op } from "sequelize";

export const createProject = async (req, res) => {
  try {
    await database.teamMember
      .findOne({
        where: { user_id: req.body.userId },
        attributes: ["is_admin"],
      })
      .then(async (user) => {
        if (!user.is_admin) {
          res.status(200).send({
            message: "User isn't admin",
          });
        } else {
          const userId = req.body.userId;
          const projectId = uniqid();
          const teamId = req.body.teamId;
          const projectName = req.body.project.name;
          const project = {
            ...req.body.project,
            id: projectId,
            owner_id: userId,
            team_id: teamId,
            name: projectName,
            createdAt: new Date(),
          };
          try {
            await database.project.create(project);
            res.status(200).send({
              message: "Project create successfully",
            });
          } catch (error) {
            res.status(500).send({
              message: error.message,
            });
          }
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// get all proj of a team user joined
export const getProjectsByTeamId = async (req, res) => {
  const teamId = req.query.teamId;
  try {
    const projects = await database.project.findAll({
      where: {
        team_id: teamId,
      },
      attributes: [
        "id",
        "name",
        "status",
        "owner_id",
        "start_date",
        "end_date",
        "createdAt",
        "team_id",
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  const projectId = req.body.projectId;
  const updateProject = req.body.project;
  try {
    await database.project
      .findOne({ where: { id: projectId } })
      .then(async (project) => {
        if (project) {
          await project.update(updateProject);
          res.status(200).send({
            message: "Project update successfully",
          });
        } else {
          res.status(500).send({
            message: error.message,
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await database.teamMember
      .findOne({
        where: { user_id: req.body.userId },
        attributes: ["is_admin"],
      })
      .then(async (user) => {
        if (!user.is_admin) {
          res.status(200).send({
            message: "User isn't admin",
          });
        } else {
          try {
            await database.project
              .findOne({ where: { id: req.body.projectId } })
              .then(async (project) => {
                if (project) {
                  await project.destroy().then(() => {
                    res.status(200).send({
                      message: "Project delete successfully",
                    });
                  });
                } else {
                  res.status(500).send({
                    message: error.message,
                  });
                }
              });
          } catch (error) {
            res.status(500).send({
              message: error.message,
            });
          }
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getProjectByProjectId = async (req, res) => {
  const userId = req.query.userId;
  const projectId = req.query.projectId
  console.log('🤖🤖🤖🤖🤖🤖🤖🤖📬📬📬📬📬', userId, projectId)
  try {
    let project = await database.project.findOne({
      where: {
        id: projectId,
      },
      attributes: [
        "id",
        "name",
        "status",
        "owner_id",
        "start_date",
        "end_date",
        "createdAt",
        "team_id",
      ],
      include: [
        {
          model: database.task,
          as: "task",
          where: {
            task_id: null,
          },
          attributes: [
            "id",
            "task_name",
            "task_description",
            "due_date",
            "created_by",
            "assigned_to",
            "completed_on",
            "task_id",
          ],
          include: [
            {
              model: database.task,
              as: "subtask",
              attributes: [
                "id",
                "task_name",
                "task_description",
                "due_date",
                "created_by",
                "assigned_to",
                "completed_on",
                "task_id",
              ],
              required: false,
            },
          ],
          required: false,
        },
      ],
      order: [[database.task,"due_date", "ASC"]],
    })
    const teamId = project.dataValues.team_id;
    console.log(teamId);
    let user = await database.teamMember.findOne({
      where: { user_id: userId, team_id: teamId },
      attributes: ["is_admin"],
    });
    let is_admin = user.dataValues.is_admin;
    const listMembers = await database.team.findOne({
      where: { id: teamId },
      attributes: [],
      include: [
        {
          model: database.user,
          as: "users",
          attributes: ["id", "username", "email", "first_name", "last_name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    project.dataValues.listMembers = listMembers.dataValues.users;
    const createdProjUser = await database.user.findOne({
      where: {
        id: project.owner_id,
      },
      attributes: ["id", "username", "email", "first_name", "last_name"],
    });
    project.owner_id = createdProjUser;
    if (project.task.length > 0) {
      await Promise.all(
        project.task.map(async (task) => {
          const createdTaskUser = await database.user.findOne({
            where: {
              id: task.created_by,
            },
            attributes: ["id", "username", "email", "first_name", "last_name"],
          });
          const assignedTaskUser = await database.user.findOne({
            where: {
              id: task.assigned_to,
            },
            attributes: ["id", "username", "email", "first_name", "last_name"],
          });
          if (is_admin) {
            task.dataValues.canEdit = true;
          } else if (task.dataValues.created_by === userId) {
            task.dataValues.canEdit = true;
          } else {
            task.dataValues.canEdit = false;
          }
          task.created_by = createdTaskUser;
          task.assigned_to = assignedTaskUser;
          if (task.subtask.length > 0) {
            await Promise.all(
              task.subtask.map(async (subtask) => {
                const createdSubTaskUser = await database.user.findOne({
                  where: {
                    id: subtask.created_by,
                  },
                  attributes: [
                    "id",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                  ],
                });
                const assignedSubTaskUser = await database.user.findOne({
                  where: {
                    id: subtask.assigned_to,
                  },
                  attributes: [
                    "id",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                  ],
                });
                if (is_admin) {
                  subtask.dataValues.canEdit = true;
                } else if (
                  subtask.dataValues.created_by === userId ||
                  task.dataValues.created_by === userId
                ) {
                  subtask.dataValues.canEdit = true;
                } else {
                  subtask.dataValues.canEdit = false;
                }
                subtask.created_by = createdSubTaskUser;
                subtask.assigned_to = assignedSubTaskUser;
                return subtask;
              })
            );
          }
          return task;
        })
      );
    }
    console.log(project);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};