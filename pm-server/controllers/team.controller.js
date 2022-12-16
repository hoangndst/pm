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
      joined_at: new Date(),
    };
  });

  try {
    await database.team.create(team);
    await database.teamMember.bulkCreate(team_members);
    res.status(200).send({ message: "Create team successfully" });
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
      joined_at: new Date(),
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
  const listMembers = req.body.membersId;
  const team_id = req.body.team_id;

  try {
    await database.teamMember.destroy({
      where: {
        user_id: listMembers,
        team_id: team_id,
      },
    });
    res.status(200).send({ message: "Detele Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const promoteToPM = async (req, res) => {
  const listMembers = req.body.membersId;
  const team_id = req.body.team_id;
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
    res.status(200).send({ message: "promote successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// export const getTeamsByUserId = async (req, res) => {
//   const userId = req.query.userId;
//   try {
//     const teamMembers = await database.teamMember.findAll({
//       where: {
//         user_id: userId,
//       },
//       attributes: [
//          "team_id",
//       ],
//     });
//     const teams = await database.team.findAll({
//       where: {
//         id: {
//           [Op.in]: teamMembers.map((teamMember) => teamMember.team_id),
//         },
//       },
//       attributes: ["id", "name"],
//     });

//     res.status(200).send(teams);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// export const getTeamsByUserId = async (req, res) => {
//   const userId = req.query.userId;
//   try {
//     const userTeams = await database.user.findOne({
//       where: {
//         id: userId,
//       },
//       attributes: ["id", "username", "first_name", "last_name"],
//       include: [
//         {
//           model: database.team,
//           as: "teams",
//           attributes: ["id", "name", "description"],
//           through: {
//             attributes: ["is_admin", "createdAt"],
//             as: "permissions",
//           },
//           include: [
//             {
//               model: database.user,
//               as: "users",
//               attributes: [
//                 "id",
//                 "username",
//                 "email",
//                 "first_name",
//                 "last_name",
//               ],
//               through: {
//                 attributes: [],
//               },
//             },
//           ],
//         },
//       ],
//     });
//     res.status(200).send(userTeams);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

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
          attributes: ["id", "name", "description"],
          through: {
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
            },
            {
              model: database.project,
              as: "project",
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
            }
          ],
        },
      ],
    });
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

