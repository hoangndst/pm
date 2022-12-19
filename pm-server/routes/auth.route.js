import { SignIn, SignUp, SignOut, changePassword } from "../controllers/auth.controller.js"
import authJWT from "../middleware/authJWT.js"

const route = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "x-access-token, Origin, Content-Type, Accept",
      "x-Trigger"
    )
    next()
  })
  app.post("/auth/signin", SignIn)
  app.post("/auth/signup", SignUp)
  app.post("/auth/signout", SignOut)
  app.post("/auth/change-password", [authJWT.verifyToken], changePassword)
}

export default route