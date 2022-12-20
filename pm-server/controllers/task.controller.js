import database from "../models/data/index.js";
import uniqid from "uniqid";
import { Op } from "sequelize";

export const createTask = async (req, res) => {
  const taskId = uniqid();
  const task = {
    id: taskId,
    ...req.body.task
  };
  try {
    await database.task.create(task);
    res.status(200).send({
      message: "task create successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
// get all task of a project
export const getTasksByProjectId = async (req, res) => {
  const projectId = req.query.projectId;
  try {
    const tasks = await database.task.findAll({
      where: {
        project_id: projectId,
      },
      attributes: [
        "id",
        "task_name",
        "due_date",
        "created_by",
        "project_id",
        "assigned_to",
        "task_id",
        "completeAt",
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const updateTask = async (req, res) => {
  try {
    await database.task
      .findOne({ where: { id: req.body.taskId } })
      .then(async (task) => {
        if (!task) {
          res.status(200).send({
            message: "Task not found",
          });
        } else {
          await task.update(req.body.task).then(() => {
            res.status(200).send({
              message: "Task update successfully",
            });
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    await database.task
      .findOne({ where: { id: req.body.taskId } })
      .then(async (task) => {
        if (!task) {
          res.status(200).send({
            message: "Task not found",
          });
        } else {
          await task.destroy().then(() => {
            res.status(200).send({
              message: "Task delete successfully",
            });
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const createSubTask = async (req, res) => {
  try {
    await database.task
      .findOne({
        where: { id: req.body.parentTaskId },
      })
      .then(async (parentTask) => {
        if (parentTask) {
          const userId = req.body.userId;
          const taskId = uniqid();
          const projectId = req.body.projectId;
          const taskName = req.body.subtask.name;
          const assignedTo = req.body.assignedTo;
          const parentTaskId = req.body.parentTaskId;
          const subtask = {
            ...req.body.subtask,
            id: taskId,
            created_by: userId,
            project_id: projectId,
            task_name: taskName,
            createdAt: new Date(),
            task_id: parentTaskId,
            assigned_to: assignedTo,
          };
          try {
            await database.task.create(subtask);
            res.status(200).send({
              message: "subtask create successfully",
            });
          } catch (error) {
            res.status(500).send({
              message: error.message,
            });
          }
        } else {
          res.status(200).send({
            message: "subtask not found",
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getSubTasksByTaskId = async (req, res) => {
  const parentTaskId = req.query.parentTaskId;
  try {
    const subtasks = await database.task.findAll({
      where: {
        task_id: parentId,
      },
      attributes: [
        "id",
        "task_name",
        "due_date",
        "created_by",
        "project_id",
        "assigned_to",
        "status",
        "task_id",
        "completedAt",
      ],
    });
    res.status(200).json(subtasks);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const updateSubTask = async (req, res) => {
  try {
    await database.task
      .findOne({ where: { created_by: req.body.userId, id: req.body.taskId } })
      .then(async (subtask) => {
        if (!subtask) {
          res.status(200).send({
            message: "User don't create this subtask",
          });
        } else {
          let updateData = req.body.updateData;
          for (let key in updateData) {
            if (
              key === "updatedAt" ||
              key === "due_date" ||
              key === "completedAt"
            ) {
              updateData[key] = new Date(updateData[key]);
            }
          }
          await subtask.update({ ...subtask, ...updateData }).then(() => {
            res.status(200).send({
              message: "subtask update successfully",
            });
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const deleteSubTask = async (req, res) => {
  try {
    await database.task
      .findOne({ where: { created_by: req.body.userId, id: req.body.taskId } })
      .then(async (task) => {
        if (!task) {
          res.status(200).send({
            message: "User don't create this subtask",
          });
        } else {
          await task.destroy().then(() => {
            res.status(200).send({
              message: "subtask delete successfully",
            });
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// export const getTasksByUserId = async (req,res) => {
//   const userId = req.query.userId;
//   try {
//     const tasks = await database.task.findAll({
//       where: {
//         assigned_to: userId,
//       },
//       attributes: ["id", "task_name", "task_description", "due_date", "created_by", "assigned_to", "completed_on", "project_id", "task_id"],
//     });

//     const user = await database.user.findOne({
//       where: {
//         id: userId,
//       },
//       attributes: ["id", "username", "first_name", "last_name"],
//     });

//     const tasksWithUser = tasks.map((task) => {
//       return {
//         ...task,
//         user,
//       };
//     });

//     res.status(200).send(tasksWithUser);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// }

export const getTasksByUserId = async (req, res) => {
  const userId = req.query.userId;
  try {
    const tasks = await database.task.findAll({
      where: {
        assigned_to: userId,
      },
      order: [["due_date", "ASC"]],
      attributes: [
        "id",
        "task_name",
        "due_date",
        "created_by",
        "project_id",
        "task_id",
        "completed_on",
      ],
    });
    await Promise.all(
      tasks.map(async (task) => {
        const createdTaskUser = await database.user.findOne({
          where: {
            id: task.created_by,
          },
          attributes: ["id", "username", "email", "first_name", "last_name"],
        });
        task.created_by = createdTaskUser;
        const project = await database.project.findOne({
          where: {
            id: task.dataValues.project_id
          },
          attributes: ["team_id"]
        })
        const teamId = project.dataValues.team_id
        const user = await database.teamMember.findOne({
          where: { user_id: userId, team_id: teamId },
          attributes: ["is_admin"],
        });
        task.dataValues.is_admin = user.dataValues.is_admin;
        return task;
      })
    );
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

