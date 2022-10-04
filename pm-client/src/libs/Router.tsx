import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home } from '../pages/Home';
import { MyTasks } from '../pages/MyTasks';
import ErrorPage from '../pages/ErrorPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/my-tasks',
        element: <MyTasks />
      }
    ],
  }
]);