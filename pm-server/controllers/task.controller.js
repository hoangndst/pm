import database from "../models/index.js";
import uniqid from "uniqid";
import { Op } from "sequelize";

export const createTask = async (req, res) => {
  const userId = req.body.userId;
  const taskId = uniqid();
  const projectId = req.body.projectId;
  const taskName = req.body.task.name;
  const assignedTo = req.body.assignedTo;
  const task = {
    ...req.body.task,
    id: taskId,
    creator_id: userId,
    project_id: projectId,
    task_name: taskName,
    createdAt: new Date(),
    task_id: null,
    assigned_to: assignedTo,
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
export const updateTask = async (req, res) => {
  try {
    await database.task
      .findOne({ where: { creator_id: req.body.userId, id: req.body.taskId } })
      .then(async (task) => {
        if (!task) {
          res.status(200).send({
            message: "User don't create this task",
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
          await task.update({ ...task, ...updateData }).then(() => {
            res.status(200).send({
              message: "task update successfully",
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
      .findOne({ where: { creator_id: req.body.userId, id: req.body.taskId } })
      .then(async (task) => {
        if (!task) {
          res.status(200).send({
            message: "User don't create this task",
          });
        } else {
          await task.destroy().then(() => {
            res.status(200).send({
              message: "task delete successfully",
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
        where: {
          [Op.or]: [
            { creator_id: req.body.userId },
            { assigned_to: req.body.userId },
          ],
          id: req.body.parentTaskId,
        },
      })
      .then(async (parentTask) => {
        if (!parentTask) {
          res.status(200).send({
            message: "User can't create subtask",
          });
        } else {
          const userId = req.body.userId;
          const taskId = uniqid();
          const projectId = req.body.projectId;
          const taskName = req.body.subtask.name;
          const assignedTo = req.body.assignedTo;
          const parentTaskId = req.body.parentTaskId;
          const subtask = {
            ...req.body.subtask,
            id: taskId,
            creator_id: userId,
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
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateSubTask = async (req, res) => {
  try {
    await database.task
      .findOne({ where: { creator_id: req.body.userId, id: req.body.taskId } })
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
      .findOne({ where: { creator_id: req.body.userId, id: req.body.taskId } })
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

export const getTasksByUserId = async (req, res) => {
  const userId = req.query.userId;
  try {
    const tasks = await database.task.findAll({
      where: {
        assigned_to: userId,
      },
      attributes: [
        "id",
        "task_name",
        "due_date",
        "creator_id",
        "project_id",
        "assigned_to",
        "task_id",
        "completedAt",
      ],
    });
    await Promise.all(
      tasks.map(async (task) => {
        const createdTaskUser = await database.user.findOne({
          where: {
            id: task.creator_id,
          },
          attributes: ["id", "username", "email", "first_name", "last_name"],
        });
        const assignedTaskUser = await database.user.findOne({
          where: {
            id: task.assigned_to,
          },
          attributes: ["id", "username", "email", "first_name", "last_name"],
        });
        task.creator_id = createdTaskUser;
        task.assigned_to = assignedTaskUser;
        return task;
      })
    );
    console.log(tasks.length);
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getTaskByTaskId = async (req, res) => {
  const taskId = req.query.taskId;
  try {
    const task = await database.task.findOne({
      where: {
        id: taskId,
      },
      attributes: [
        "id",
        "task_name",
        "due_date",
        "creator_id",
        "project_id",
        "assigned_to",
        "task_id",
        "completedAt",
      ],
      include: [
        {
          model: database.task,
          where: {
            task_id: taskId,
          },
          as: "subtask",
          attributes: [
            "id",
            "task_name",
            "due_date",
            "creator_id",
            "project_id",
            "assigned_to",
            "task_id",
            "completedAt",
          ],
          required: false,
        },
      ],
    });
    const createdTaskUser = await database.user.findOne({
      where: {
        id: task.creator_id,
      },
      attributes: ["id", "username", "email", "first_name", "last_name"],
    });
    const assignedTaskUser = await database.user.findOne({
      where: {
        id: task.assigned_to,
      },
      attributes: ["id", "username", "email", "first_name", "last_name"],
    });
    task.creator_id = createdTaskUser;
    task.assigned_to = assignedTaskUser;
    await Promise.all(
      task.subtask.map(async (subtask) => {
        const createdSubTaskUser = await database.user.findOne({
          where: {
            id: subtask.creator_id,
          },
          attributes: ["id", "username", "email", "first_name", "last_name"],
        });
        const assignedSubTaskUser = await database.user.findOne({
          where: {
            id: subtask.assigned_to,
          },
          attributes: ["id", "username", "email", "first_name", "last_name"],
        });
        subtask.creator_id = createdSubTaskUser;
        subtask.assigned_to = assignedSubTaskUser;
        return subtask;
      })
    );
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
