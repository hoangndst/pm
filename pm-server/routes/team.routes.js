import authJWT from "../middleware/authJWT.js"
import { createTeam, addTeamMembers, removeTeamMembers, promoteToPM, getTeamsByUserId, getTeamMembersByTeamId, deleteTeam, updateTeamMember } from "../controllers/team.controller.js";

const teamRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/pm/create-team", [authJWT.verifyToken], createTeam);
  app.post("/pm/add-team-members", [authJWT.verifyToken], addTeamMembers);
  app.post("/pm/remove-team-members", [authJWT.verifyToken], removeTeamMembers);
  app.post("/pm/delete-team-by-id", [authJWT.verifyToken], deleteTeam);
  app.patch("/pm/promote-to-pm", [authJWT.verifyToken], promoteToPM);
  app.get("/pm/get-teams-by-userid",  getTeamsByUserId);
  app.get("/pm/get-teammembers-by-teamid", [authJWT.verifyToken], getTeamMembersByTeamId);
  app.put("/pm/update-team-member", updateTeamMember)
}
export default teamRoutes;