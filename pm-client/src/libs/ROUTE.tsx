import { createBrowserRouter } from "react-router-dom";
import { MyTasks } from "../pages/MyTasks";
import Login from "../pages/Login";
import Main from "../pages/Main";

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
        element: <div>Inbox</div>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default route