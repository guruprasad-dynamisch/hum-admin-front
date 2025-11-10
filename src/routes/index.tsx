import React, { Suspense } from 'react'
import { createBrowserRouter, Outlet, RouteObject, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleBasedRoute from './RoleBasedRoute'
import ProtectedLayout from '../components/ProtectedLayout'
import PageLoader from '../components/PageLoader'
import PageTitle from '../components/PageTitle'
import NotFound from '../pages/NotFound'
import { publicRoutes } from './publicRoutes'
import { protectedRoutes } from './protectedRoutes'
import AuthInit from '../components/AuthInit'
import { ProtectedRouteConfig } from './types'
import { getRouteByKey } from '../utils/helpers'

// AuthInit wrapper for router context with PageTitle
const AuthInitWrapper = () => (
  <AuthInit>
    <PageTitle />
    <Outlet />
  </AuthInit>
)

// Wrapper component for protected routes with layout
const ProtectedLayoutWrapper = () => (
  <ProtectedRoute>
    <ProtectedLayout />
  </ProtectedRoute>
)

// Wrapper component for public routes
const PublicRouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <PublicRoute>
    {children}
  </PublicRoute>
)

// Enhanced NotFound component with Suspense
const NotFoundWrapper = () => (
  <Suspense fallback={<PageLoader />}>
    <NotFound />
  </Suspense>
)

/**
 * Recursively converts route configuration to React Router route objects
 * with role-based protection applied at each level
 */
const convertToRouteObjects = (routes: ProtectedRouteConfig[]): RouteObject[] => {
  return routes.map(({ path, element: Element, allowedRoles, children }) => {
    const routeObject: RouteObject = {
      path,
      element: (
        <RoleBasedRoute allowedRoles={allowedRoles}>
          <Suspense fallback={<PageLoader />}>
            <Element />
          </Suspense>
        </RoleBasedRoute>
      ),
    }

    // Recursively process children routes if they exist
    if (children && children.length > 0) {
      routeObject.children = convertToRouteObjects(children)
    }

    return routeObject
  })
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthInitWrapper />,
    children: [
      // Public routes with Suspense for lazy loading
      ...publicRoutes.map(({ path, element: Element }) => ({
        path,
        element: (
          <PublicRouteWrapper>
            <Suspense fallback={<PageLoader />}>
              <Element />
            </Suspense>
          </PublicRouteWrapper>
        ),
      })),
      // Protected routes
      {
        path: '/',
        element: <ProtectedLayoutWrapper />,
        children: [
          {
            index: true,
            element: <Navigate to={getRouteByKey('dashboard')} replace />
          },
          ...convertToRouteObjects(protectedRoutes)
        ],
      },
      // Catch all route - 404
      {
        path: '*',
        element: <NotFoundWrapper />
      },
    ]
  },
])
