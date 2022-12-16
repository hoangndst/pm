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
                  let updateData = req.body.updateData;
                  for (let key in updateData) {
                    if (key === "start_date" || key === "end_date") {
                      updateData[key] = new Date(updateData[key]);
                    }
                  }
                  await project
                    .update({ ...project, ...updateData })
                    .then(() => {
                      res.status(200).send({
                        message: "Project update successfully",
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
