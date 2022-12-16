import authJWT from "../middleware/authJWT.js"
import { createUser, getUser, searchUsers } from "../controllers/user.controller.js"

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
  app.get("/pm/search-users", [authJWT.verifyToken], searchUsers)
}

export default userRoutes;
