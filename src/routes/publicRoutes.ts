import Login from "@pages/Login";
import Register from "@pages/Register";
import ForgotPassword from "@pages/ForgotPassword";
import ResetPassword from "@pages/ResetPassword";
import { PublicRouteConfig } from './types'

export const publicRoutes: PublicRouteConfig[] = [
  {
    key: "login",
    path: "/login",
    title: 'Login',
    element: Login,
  },
  {
    key: "register",
    path: "/register",
    title: 'Registration',
    element: Register,
  },
  {
    key: "forgotPassword",
    title: 'Forgot Password',
    path: "/forgot-password",
    element: ForgotPassword,
  },
  {
    key: "resetPassword",
    title: 'Reset Password',
    path: "/reset-password",
    element: ResetPassword,
  }
];
