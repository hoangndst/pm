import authJWT from "../middleware/authJWT.js"
import { createProject, getAllProjects, updateProject,deleteProject} from "../controllers/project.controller.js"

const projectRoutes = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        next()
      })
      app.post("/pm/create-project", [authJWT.verifyToken], createProject)
      app.get("/pm/get-all-projects", [authJWT.verifyToken], getAllProjects)
      app.put("/pm/update-project", [authJWT.verifyToken], updateProject)
      app.delete("/pm/delete-project", [authJWT.verifyToken], deleteProject)
}
export default projectRoutes;