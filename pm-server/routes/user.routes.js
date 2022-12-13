import authJWT from "../middleware/authJWT.js"
import { createUser, getUser, searchUsers } from "../controllers/user.controller.js"
import { createConversation, getConversations } from "../controllers/conversation.controller.js"
import { createMessage, getMessages } from "../controllers/message.controller.js"
import { createProject, getAllProjects, updateProject,deleteProject} from "../controllers/project.controller.js"
import { createTask,getAllTasks, updateTask,deleteTask,createSubTask,getAllSubTasks, updateSubTask,deleteSubTask } from "../controllers/task.controller.js"
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
  app.post("/pm/create-conversation", [authJWT.verifyToken], createConversation)
  app.get("/pm/get-conversations", [authJWT.verifyToken], getConversations)
  app.post("/pm/create-message", [authJWT.verifyToken], createMessage)
  app.get("/pm/get-messages", [authJWT.verifyToken], getMessages)
  app.get("/pm/search-users", [authJWT.verifyToken], searchUsers)
  app.post("/pm/create-project", [authJWT.verifyToken], createProject)
  app.get("/pm/get-all-projects", [authJWT.verifyToken], getAllProjects)
  app.put("/pm/update-project", [authJWT.verifyToken], updateProject)
  app.delete("/pm/delete-project", [authJWT.verifyToken], deleteProject)
  app.post("/pm/create-task", [authJWT.verifyToken], createTask)
  app.get("/pm/get-all-tasks", [authJWT.verifyToken], getAllTasks)
  app.put("/pm/update-task", [authJWT.verifyToken], updateTask)
  app.delete("/pm/delete-task", [authJWT.verifyToken], deleteTask)
  app.post("/pm/create-subtask", [authJWT.verifyToken], createSubTask)
  app.get("/pm/get-all-subtasks", [authJWT.verifyToken], getAllSubTasks)
  app.put("/pm/update-subtask", [authJWT.verifyToken], updateSubTask)
  app.delete("/pm/delete-subtask", [authJWT.verifyToken], deleteSubTask)
}

export default userRoutes