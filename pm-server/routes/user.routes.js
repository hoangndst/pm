import authJWT from "../middleware/authJWT.js"
import { createUser, getUser, searchUsers } from "../controllers/user.controller.js"
import { createConversation, getConversations } from "../controllers/conversation.controller.js"
import { createMessage, getMessages } from "../controllers/message.controller.js"
import { createTeam } from "../controllers/team.controller.js"
const userRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/pm/create-user", [authJWT.verifyToken], createUser)
  app.get("/pm/user", [authJWT.verifyToken], getUser)
  app.post("/pm/create-conversation", [authJWT.verifyToken], createConversation)
  app.get("/pm/get-conversations", [authJWT.verifyToken], getConversations)
  app.post("/pm/create-message", [authJWT.verifyToken], createMessage)
  app.get("/pm/get-messages", [authJWT.verifyToken], getMessages)
  app.get("/pm/search-users", [authJWT.verifyToken], searchUsers)
  app.post("/pm/create-team", [authJWT.verifyToken], createTeam)
}

export default userRoutes