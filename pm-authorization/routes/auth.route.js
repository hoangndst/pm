import { SignIn, SignUp, SignOut } from "../controllers/auth.controller.js"

const route = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.post("/auth/signin", SignIn)
  app.post("/auth/signup", SignUp)
  app.post("/auth/signout", SignOut)
}

export default route