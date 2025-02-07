import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Home";
import Topic from "../Topic";
import ErrorPage from "../ErrorPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/topic",
        element: <Topic></Topic>,
      },

    ],
  },
]);
