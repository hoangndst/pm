import authJWT from "../middleware/authJWT.js"
import { createComment, deleteComment, getCommentByUserId, getCommentByTaskId, getAllCommentReactions} from "../controllers/comment.controller.js"

const commentRoutes = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        next()
      })
      app.post("/pm/create-comment",[authJWT.verifyToken], createComment);
      app.delete("/pm/delete-comment",[authJWT.verifyToken], deleteComment);
      app.get("/pm/get-comment-by-user", [authJWT.verifyToken],getCommentByUserId);
      app.get("/pm/get-comment-by-task",[authJWT.verifyToken], getCommentByTaskId);
      app.get("/pm/get-comment-reaction", [authJWT.verifyToken],getAllCommentReactions)
}
export default commentRoutes;