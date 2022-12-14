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
// get all task of a project
export const getAllTasks = async (req, res) => {
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
        "creator_id",
        "project_id",
        "assigned_to",
        "status",
        "task_id",
        "complete_on",
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
              key === "completed_on"
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
        where: { id: req.body.parentTaskId, creator_id: req.body.userId },
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
        } else {
          res.status(200).send({
            message: "User don't create this subtask",
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getAllSubTasks = async (req, res) => {
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
        "creator_id",
        "project_id",
        "assigned_to",
        "status",
        "task_id",
        "completed_on",
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
              key === "completed_on"
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
