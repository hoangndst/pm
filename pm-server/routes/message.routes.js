import authJWT from "../middleware/authJWT.js"
import { createMessage, getMessages } from "../controllers/message.controller.js"
const teamRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/pm/create-message", [authJWT.verifyToken], createMessage)
  app.get("/pm/get-messages", [authJWT.verifyToken], getMessages)
}
export default teamRoutes;