import database from "../models/data/index.js"
import uniqid from "uniqid"
import { Op } from "sequelize"

// create team

export const createTeam = async (req, res) => { // ["1", "2", "3"]
  const id = uniqid()
  const teamMembers = req.body.teamMembers
  const teamName = req.body.teamName
  const team = {
    id: id,
    name: teamName
  }
  const teamMems = teamMembers.map((member, index) => {
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