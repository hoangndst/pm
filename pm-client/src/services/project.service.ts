import AuthHeader from "./auth.header"
import pmServer from "src/api/pmServer"

const CreateProject = async (project: any) => {
  const response = await pmServer.post(`/pm/create-project`, project, { headers: AuthHeader() })
  return response.data
}

const DeleteProject = async (userId: string, projectId: string) => {
  const response = await pmServer.post(`/pm/delete-project`, { userId: userId, projectId: projectId }, { headers: AuthHeader() })
  return response.data
}

const ProjectService = {
  CreateProject,
  DeleteProject
}
export default ProjectService