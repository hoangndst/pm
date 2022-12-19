import authJWT from "../middleware/authJWT.js"
import { createTeam, updateTeam, addTeamMembers, removeTeamMembers, promoteToPM, getTeamsByUserId, getTeamMembersByTeamId, deleteTeam, updateTeamMember, demoteToMember } from "../controllers/team.controller.js";

const teamRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/pm/create-team", [authJWT.verifyToken], createTeam);
  app.put("/pm/update-team", [authJWT.verifyToken], updateTeam);
  app.post("/pm/add-team-members", [authJWT.verifyToken], addTeamMembers);
  app.post("/pm/remove-team-members", [authJWT.verifyToken], removeTeamMembers);
  app.post("/pm/delete-team-by-id", [authJWT.verifyToken], deleteTeam);
  app.put("/pm/promote-to-pm", [authJWT.verifyToken], promoteToPM);
  app.get("/pm/get-teams-by-userid", [authJWT.verifyToken], getTeamsByUserId);
  app.get("/pm/get-teammembers-by-teamid", [authJWT.verifyToken], getTeamMembersByTeamId);
  app.put("/pm/update-team-member", [authJWT.verifyToken], updateTeamMember);
  app.put("/pm/demote-to-member", [authJWT.verifyToken], demoteToMember);
}
export default teamRoutes;