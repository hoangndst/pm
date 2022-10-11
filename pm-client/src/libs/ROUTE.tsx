import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";
import { MyTasks } from "../pages/MyTasks";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  }
]);