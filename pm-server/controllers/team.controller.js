import database from "../models/index.js";
import uniqid from "uniqid";
import { Op } from "sequelize";

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
