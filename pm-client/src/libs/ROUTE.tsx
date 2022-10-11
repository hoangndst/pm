import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home";

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
        element: <div>Tasks</div>,
      },
      {
        path: "inbox",
        element: <div>Inbox</div>,
      }
    ]
  }
]);