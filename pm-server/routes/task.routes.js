import authJWT from "../middleware/authJWT.js"
import { createTask,getAllTasks, updateTask,deleteTask,createSubTask,getAllSubTasks, updateSubTask,deleteSubTask } from "../controllers/task.controller.js"

const taskRoutes = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        next()
      })
      app.post("/pm/create-task", [authJWT.verifyToken], createTask)
      app.get("/pm/get-all-tasks", [authJWT.verifyToken], getAllTasks)
      app.put("/pm/update-task", [authJWT.verifyToken], updateTask)
      app.delete("/pm/delete-task", [authJWT.verifyToken], deleteTask)
      app.post("/pm/create-subtask", [authJWT.verifyToken], createSubTask)
      app.get("/pm/get-all-subtasks", [authJWT.verifyToken], getAllSubTasks)
      app.put("/pm/update-subtask", [authJWT.verifyToken], updateSubTask)
      app.delete("/pm/delete-subtask", [authJWT.verifyToken], deleteSubTask)
}
export default taskRoutes;