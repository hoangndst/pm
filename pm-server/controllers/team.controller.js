import database from "../models/index.js"
import uniqid from "uniqid"
import { Op } from "sequelize"

// create team

const createTeam = async (req, res) => { // ["1", "2", "3"]
  const membersId = req.body.membersId
  const teamId = uniqid()
  const team_name = req.body.teamName
  const team = {
    id: teamId,
    name: team_name
  }
  var team_members = []
  membersId.forEach(id => {
    const team_member = {
      user_id: id,
      team_id: teamId
    }
    team_members.push(team_member)
  });
  

  try {
    await database.team.create(team)
    team_members.forEach(team_member => {
      database.teamMember(team_member)
    })
  } catch(err) {

  }
}