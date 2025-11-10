import { lazy } from 'react'
import { PublicRouteConfig } from './types'

// Lazy load public page components for code-splitting
const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@pages/ResetPassword'))

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
