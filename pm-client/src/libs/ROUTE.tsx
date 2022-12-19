import { createBrowserRouter } from "react-router-dom"
import { MyTasks } from "../pages/MyTasks"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import Main from "../pages/Main"
import Home from "../pages/Home"
import Inbox from "../pages/Inbox"
import SetupNewUser from "../pages/SetupNewUser"
import ChatSpace from "../modules/components/ChatSpace"
import ChatSpaceIndex from "src/modules/components/ChatSpaceIndex"
import InBoxContext from "src/contexts/InboxContext"
import SetupNewUserContext from "src/contexts/SetupNewUserContext"
import AppContext from "src/contexts/AppContext"
import TaskContext from "src/contexts/TaskContext"
import Profile from "src/pages/Profile"
import Teams from "src/pages/Teams"
import Team from "src/pages/Team"
import TeamContext from "src/contexts/TeamContext"
import NotificationContext from "src/contexts/NotificationContex"
import { Project } from "src/pages/Project"
import ProjectContext from "src/contexts/ProjectContext"

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppContext><NotificationContext><Main /></NotificationContext></AppContext>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tasks",
        element: <TaskContext><MyTasks /></TaskContext>,
      },
      {
        path: "inbox",
        element: <InBoxContext><Inbox /></InBoxContext>,
        children: [
          {
            path: ":conversationId",
            element: <ChatSpace />,
          },
          {
            index: true,
            element: <ChatSpaceIndex />,
          }
        ]
      },
      {
        path: ":userId",
        element: <Profile />,
      },
      {
        path: "teams",
        element: <Teams />
      },
      {
        path: "teams/:teamId",
        element: <TeamContext><Team /></TeamContext>,
      },
      {
        path: "projects/:projectId",
        element: <TeamContext><ProjectContext><TaskContext><Project /></TaskContext></ProjectContext></TeamContext>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/welcome",
    element: <SetupNewUserContext><SetupNewUser /></SetupNewUserContext>,
  }
])

export default route