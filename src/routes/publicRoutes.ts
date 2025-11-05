import Login from "@pages/Login";
// import Register from "@pages/Register";
import { PublicRouteConfig } from './types'

export const publicRoutes: PublicRouteConfig[] = [
  {
    key: "login",
    path: "/login",
    element: Login,
  },
  // {
  //   key: "register",
  //   path: "/register",
  //   element: Register,
  // }
];
