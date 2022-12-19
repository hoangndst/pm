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
import MyTaskContext from "src/contexts/MyTaskContext"
import Profile from "src/pages/Profile"
import Teams from "src/pages/Teams"
import Team from "src/pages/Team"
import { Project } from "src/pages/Project"
import ProjectContext from "src/contexts/ProjectContext"
import AccountSettings from "src/pages/AccountSettings"

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppContext><Main /></AppContext>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tasks",
        element: <MyTaskContext><MyTasks /></MyTaskContext>,
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
        path: "profile/:userId",
        element: <Profile />,
      },
      {
        path: "account-settings/:userId",
        element: <AccountSettings />,
      },
      {
        path: "teams",
        element: <Teams />
      },
      {
        path: "teams/:teamId",
        element: <Team />,
      },
      {
        path: "projects/:projectId",
        element: <ProjectContext><TaskContext><Project /></TaskContext></ProjectContext>,
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