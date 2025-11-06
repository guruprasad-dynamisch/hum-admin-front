import Login from "@pages/Login";
import Register from "@pages/Register";
import ForgotPassword from "@pages/ForgotPassword";
import ResetPassword from "@pages/ResetPassword";
import { PublicRouteConfig } from './types'

export const publicRoutes: PublicRouteConfig[] = [
  {
    key: "login",
    path: "/login",
    element: Login,
  },
  {
    key: "register",
    path: "/register",
    element: Register,
  },
  {
    key: "forgotPassword",
    path: "/forgot-password",
    element: ForgotPassword,
  },
  {
    key: "resetPassword",
    path: "/reset-password",
    element: ResetPassword,
  }
];
