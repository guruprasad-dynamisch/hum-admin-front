import { lazy } from 'react'
import { Role } from '@constants/roles'
import { ProtectedRouteConfig } from './types'

// Lazy load page components for code-splitting
// Each page will be loaded on-demand, reducing initial bundle size
const Dashboard = lazy(() => import('@pages/Dashboard'))
const Users = lazy(() => import('@pages/Users'))
const Templates = lazy(() => import('@pages/Templates'))
const Audit = lazy(() => import('@pages/Audit'))
const Costing = lazy(() => import('@pages/Costing'))
const Settings = lazy(() => import('@pages/Settings'))
const Logout = lazy(() => import('@pages/Logout'))

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
