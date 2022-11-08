import { SignIn, SignUp, SignOut } from "../controllers/auth.controller.js"

const route = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/signin", SignIn)
  app.post("/signup", SignUp)
  app.post("/signout", SignOut)
}

export default route