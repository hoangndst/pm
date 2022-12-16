import authJWT from "../middleware/authJWT.js"
import { createTask,getTasksByUserId, updateTask,deleteTask,createSubTask,getSubTasksByTaskId, updateSubTask,deleteSubTask, getTasksByProjectId } from "../controllers/task.controller.js"

const taskRoutes = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        next()
      })
      app.post("/pm/create-task", [authJWT.verifyToken], createTask)
      app.get("/pm/get-tasks-by-userid", [authJWT.verifyToken], getTasksByUserId)
      app.put("/pm/update-task", [authJWT.verifyToken], updateTask)
      app.delete("/pm/delete-task", [authJWT.verifyToken], deleteTask)
      app.post("/pm/create-subtask", [authJWT.verifyToken], createSubTask)
      app.get("/pm/get-subtasks-by-taskid", [authJWT.verifyToken], getSubTasksByTaskId)
      app.put("/pm/update-subtask", [authJWT.verifyToken], updateSubTask)
      app.delete("/pm/delete-subtask", [authJWT.verifyToken], deleteSubTask)
      app.get("/pm/get-tasks-by-projectid", [authJWT.verifyToken], getTasksByProjectId)
}
export default taskRoutes;