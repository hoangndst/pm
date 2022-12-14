import authJWT from "../middleware/authJWT.js"
import { createTeam, addTeamMembers, removeTeamMembers, promoteToPM} from "../controllers/team.controller.js";

const teamRoutes = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        next()
      })
      app.post("/pm/create-team", createTeam);
      app.post("/pm/add-team-members", addTeamMembers);
      app.delete("/pm/remove-team-members", removeTeamMembers);
      app.patch("/pm/promote-to-pm", promoteToPM);
}
export default teamRoutes;