import AuthHeader from "./auth.header"
import pmServer from "src/api/pmServer"

const CreateTeam = async (teamName: string, membersId: any[]) => {
  const response = await pmServer.post(`/pm/create-team`, { teamName: teamName, membersId: membersId }, { headers: AuthHeader() })
  return response.data
}

const GetTeamsByUserId = async (userId: string) => {
  const response = await pmServer.get(`/pm/get-teams-by-userid?userId=${userId}`, { headers: AuthHeader() })
  return response.data
}

const DeleteTeamByTeamId = async (userId: string, teamId: string) => {
  const response = await pmServer.post(`/pm/delete-team-by-id`, { userId: userId, teamId: teamId }, { headers: AuthHeader() })
  return response.data
}

const TeamsService = {
  CreateTeam,
  GetTeamsByUserId,
  DeleteTeamByTeamId
}
export default TeamsService