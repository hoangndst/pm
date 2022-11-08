import authJWT from "../middleware/authJWT.js"
import userAccessTest from "../controllers/user.controller.js"

const userRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.get("/api/test/user", [authJWT.verifyToken], userAccessTest)
}

export default userRoutes