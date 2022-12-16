import userRoutes from './user.routes.js'
import teamRoutes from './team.routes.js'
import projectRoutes from './project.routes.js'
import taskRoutes from './task.routes.js'
import commentRoutes from './comment.routes.js'
import conversationRoutes from './conversation.routes.js'
import messageRoutes from './message.routes.js'
import authRoutes from './auth.route.js'
import clientRoute from './client.route.cjs'
const routes = (app) =>{
    userRoutes(app)
    teamRoutes(app)
    projectRoutes(app)
    taskRoutes(app)
    commentRoutes(app)
    conversationRoutes(app)
    messageRoutes(app)
    authRoutes(app)
    clientRoute(app)
}
export default routes