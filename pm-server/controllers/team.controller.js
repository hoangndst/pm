import database from "../models/data/index.js"
import uniqid from "uniqid"
import { Op } from "sequelize"

export const createTeam = async (req, res) => {
  const listMembers = req.body.membersId;
  const team_id = uniqid();
  const team_name = req.body.teamName;

  const team = {
    id: team_id,
    name: team_name,
  };

  const team_members = listMembers.map((id, index) => {
    return {
      user_id: id,
      team_id: team_id,
      is_admin: index == 0 ? true : false,
      joined_at: index == 0 ? new Date() : null,
    };
  });

  try {
    await database.team.create(team);
    await database.teamMember.bulkCreate(team_members);
    res.status(200).send({ message: "Create team successfully", team: team });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const addTeamMembers = async (req, res) => {
  const listNewMembers = req.body.newMembers;
  const team_id = req.body.team_id;

  const new_members = listNewMembers.map((id) => {
    return {
      user_id: id,
      team_id: team_id,
      is_admin: false,
      joined_at: null,
    };
  });

  try {
    await database.teamMember.bulkCreate(new_members);
    res.status(200).send({ message: "Add Members Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const removeTeamMembers = async (req, res) => {
  const user_id = req.body.memberId;
  const team_id = req.body.teamId;

  try {
    await database.teamMember.destroy({
      where: {
        user_id: user_id,
        team_id: team_id,
      },
    });
    res.status(200).send({ message: "Delete Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const promoteToPM = async (req, res) => {
  const listMembers = req.body.memberId;
  const team_id = req.body.teamId;
  try {
    await database.teamMember.update(
      { is_admin: true },
      {
        where: {
          user_id: listMembers,
          team_id: team_id,
        },
      }
    );
    res.status(200).send({ message: "Promote successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const demoteToMember = async (req, res) => {
  const listMembers = req.body.memberId;
  const team_id = req.body.teamId;
  try {
    await database.teamMember.update(
      { is_admin: false },
      {
        where: {
          user_id: listMembers,
          team_id: team_id,
        },
      }
    );
    res.status(200).send({ message: "Demote successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


export const getTeamsByUserId = async (req, res) => {
  const userId = req.query.userId;
  try {
    const userTeams = await database.user.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: database.team,
          as: "teams",
          attributes: ["id", "name", "description", "createdAt"],
          through: {
            where: {
              joined_at: { [Op.ne]: null },
            },
            attributes: ["is_admin", "createdAt"],
            as: "permissions",
          },
          include: [
            {
              model: database.user,
              as: "users",
              attributes: [
                "id",
                "username",
                "email",
                "first_name",
                "last_name",
              ],
              through: {
                attributes: [],
              },
              include: [
                {
                  model: database.team,
                  as: "teams",
                  atrributes: [],
                  through: { attributes: ["joined_at", "is_admin"], as: "permissions" },
                },
              ],
            },
            {
              model: database.project,
              as: "project",
              // order: [["createdAt", "DESC"]],
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
            },
          ],
        },
      ],
      order: [[{ model: database.team, as: "teams" }, { model: database.project, as: "project" }, "createdAt", "DESC"]],
    });
    if (userTeams.teams.length > 0) {
      userTeams.teams.map((team) => {
        team.users.map((user) => {
          let teamId = team.dataValues.id;
          let is_admin = false;
          let is_joined = false;
          user.dataValues.teams.forEach((team2) => {
            if (
              team2.id === teamId &&
              team2.dataValues.permissions.joined_at !== null
            ) {
              is_joined = true;
              if (team2.dataValues.permissions.is_admin) {
                is_admin = true
              }
            }
          });
          delete user.dataValues.teams;
          user.dataValues.is_joined = is_joined;
          user.dataValues.is_admin = is_admin;
          return user;
        });
        return team;
      });
    }
    res.status(200).send(userTeams);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getTeamMembersByTeamId = async (req, res) => {
  const teamId = req.query.teamId;
  try {
    const teamMembers = await database.teamMember.findAll({
      where: {
        team_id: teamId,
      },
      attributes: [
        "id", "is_admin", "joined_at", "user_id", "team_id",
      ],
    });
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}

export const deleteTeam = async (req, res) => {
  try {
    await database.teamMember
      .findOne({
        where: { user_id: req.body.userId, team_id: req.body.teamId },
        attributes: ["is_admin"],
      })
      .then(async (user) => {
        if (!user.is_admin) {
          res.status(200).send({
            message: "User isn't admin",
          });
        } else {
          try {
            await database.team
              .findOne({ where: { id: req.body.teamId } })
              .then(async (team) => {
                if (team) {
                  await team.destroy().then(() => {
                    res.status(200).send({
                      message: "team delete successfully",
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

export const updateTeam = async (req, res) => {
  const teamId = req.body.teamId;
  const updateTeam = req.body.team;
  try {
    await database.team
      .findOne({ where: { id: teamId } })
      .then(async (team) => {
        if (team) {
          await team.update(updateTeam).then(() => {
            res.status(200).send({
              message: "team update successfully",
            });
          });
        } else {
          res.status(500).send({
            message: "team not found",
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    await database.teamMember
      .findOne({ where: { user_id: req.body.userId, team_id: req.body.teamId } })
      .then(async (teamMember) => {
        if (teamMember) {
          await teamMember
            .update({ joined_at: new Date() })
            .then(() => {
              res.status(200).send({
                message: "teamMember update successfully",
              });
            });
        } else {
          res.status(500).send({
            message: "Invitation no longer valid",
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};