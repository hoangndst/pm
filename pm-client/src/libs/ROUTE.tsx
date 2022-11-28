import { createBrowserRouter } from "react-router-dom";
import { MyTasks } from "../pages/MyTasks";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import SetupNewUser from "../pages/SetupNewUser";
import ChatSpace from "../modules/components/ChatSpace";
import InBoxContext from "src/contexts/InboxContext";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tasks",
        element: <MyTasks />,
      },
      {
        path: "inbox",
        element: <InBoxContext><Inbox /></InBoxContext>,
        children: [
          {
            path: ":conversationId",
            element: <ChatSpace />,
          }
        ]
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
    element: <SetupNewUser />,
  }
]);

export default route