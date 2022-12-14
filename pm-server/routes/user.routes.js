import authJWT from "../middleware/authJWT.js"
import { createUser, getUser, searchUsers, updateUser } from "../controllers/user.controller.js"

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
  app.put("/pm/update-user", [authJWT.verifyToken], updateUser)
}

export default userRoutes;
