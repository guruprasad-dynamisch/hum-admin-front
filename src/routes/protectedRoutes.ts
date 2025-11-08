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
    title: 'Dashboard',
    element: Dashboard,
    allowedRoles: [Role.SUPER_ADMIN],
  },
  {
    key: 'users',
    path: 'users',
    title: 'User Management',
    element: Users,
    allowedRoles: [Role.SUPER_ADMIN],
  },
  {
    key: 'templates',
    path: 'templates',
    title: 'Template Management',
    element: Templates,
    allowedRoles: [Role.SUPER_ADMIN],
  },
  {
    key: 'audit',
    path: 'audit',
    title: 'Audit Trail',
    element: Audit,
    allowedRoles: [Role.SUPER_ADMIN],
  },
  {
    key: 'costing',
    path: 'costing',
    title: 'Cost Reports',
    element: Costing,
    allowedRoles: [Role.SUPER_ADMIN],
  },
  {
    key: 'settings',
    path: 'settings',
    title: 'Profile',
    element: Settings,
    allowedRoles: [Role.SUPER_ADMIN],
  },
  {
    key: 'logout',
    path: 'logout',
    element: Logout,
    allowedRoles: [Role.SUPER_ADMIN],
  },
]
