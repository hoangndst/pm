import authJWT from "../middleware/authJWT.js"
import { createConversation, getConversations } from "../controllers/conversation.controller.js"
const conversationRoutes = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        next()
      })
      app.post("/pm/create-conversation", [authJWT.verifyToken], createConversation)
      app.get("/pm/get-conversations", [authJWT.verifyToken], getConversations)
}
export default conversationRoutes;