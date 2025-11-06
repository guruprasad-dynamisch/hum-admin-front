import Logout from '@pages/Logout'
import Dashboard from '@pages/Dashboard'
import Users from '@pages/Users'
import Templates from '@pages/Templates'
import Audit from '@pages/Audit'
import Costing from '@pages/Costing'
import Settings from '@pages/Settings'
import { Role } from '@constants/roles'
import { ProtectedRouteConfig } from './types'

export const protectedRoutes: ProtectedRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    element: Dashboard,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
  {
    key: 'users',
    path: 'users',
    element: Users,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
  {
    key: 'templates',
    path: 'templates',
    element: Templates,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
  {
    key: 'audit',
    path: 'audit',
    element: Audit,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
  {
    key: 'costing',
    path: 'costing',
    element: Costing,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
  {
    key: 'settings',
    path: 'settings',
    element: Settings,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
  {
    key: 'logout',
    path: 'logout',
    element: Logout,
    allowedRoles: [Role.USER, Role.ADMIN],
  },
]
