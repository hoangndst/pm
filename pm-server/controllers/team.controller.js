import database from "../models/index.js"
import uniqid from "uniqid"
import { Op } from "sequelize"

export const createTeam = async (req, res) => {
  const listMembers = req.body.membersId;
  const team_id = uniqid();
  const team_name = req.body.teamName;

  const team = {
    id: id,
    name: teamName
  }
};

export const addTeamMembers = async (req, res) => {
  const listNewMembers = req.body.newMembers;
  const team_id = req.body.team_id;

  const new_members = listNewMembers.map((id) => {
    return {
      user_id: member.id,
      team_id: id,
      is_admin: index === 0 ? true : false
    }
  })
  try {
    await database.team.create(team)
    await database.teamMember.bulkCreate(teamMems)
    res.status(200).send({ message: "Team created successfully" })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const addTeamMember = async (req, res) => {
  const teamId = req.body.teamId
}