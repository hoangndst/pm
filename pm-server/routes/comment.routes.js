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
      app.post("/pm/create-comment", createComment);
      app.delete("/pm/delete-comment", deleteComment);
      app.get("/pm/get-comment-by-user", getCommentByUserId);
      app.get("/pm/get-comment-by-task", getCommentByTaskId);
      app.get("/pm/get-comment-reaction", getAllCommentReactions)
}
export default commentRoutes;