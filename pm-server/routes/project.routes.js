import authJWT from "../middleware/authJWT.js"
import { createProject, getProjectsByTeamId, updateProject, deleteProject, getProjectByProjectId } from "../controllers/project.controller.js"

const projectRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/pm/create-project", [authJWT.verifyToken], createProject)
  app.get("/pm/get-all-projects", [authJWT.verifyToken], getProjectsByTeamId)
  app.put("/pm/update-project", [authJWT.verifyToken], updateProject)
  app.post("/pm/delete-project", [authJWT.verifyToken], deleteProject)
  app.get("/pm/get-project-by-project-id",getProjectByProjectId)
  
}
export default projectRoutes;