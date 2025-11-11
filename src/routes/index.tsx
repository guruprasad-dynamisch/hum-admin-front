import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, Outlet, RouteObject, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleBasedRoute from './RoleBasedRoute'
import ProtectedLayout from '../components/ProtectedLayout'
import PageLoader from '../components/PageLoader'
import PageTitle from '../components/PageTitle'
import ErrorBoundary from '../components/common/ErrorBoundary'
import RouteErrorBoundary from '../components/common/RouteErrorBoundary'
import { publicRoutes } from './publicRoutes'
import { protectedRoutes } from './protectedRoutes'
import AuthInit from '../components/AuthInit'
import { ProtectedRouteConfig } from './types'
import { getRouteByKey } from '../utils/helpers'

// Lazy load NotFound page
const NotFound = lazy(() => import('../pages/NotFound'))

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
 * with role-based protection and error boundaries applied at each level
 */
const convertToRouteObjects = (routes: ProtectedRouteConfig[]): RouteObject[] => {
  return routes.map(({ path, element: Element, allowedRoles, children, title }) => {
    const routeObject: RouteObject = {
      path,
      element: (
        <RouteErrorBoundary routeName={title}>
          <RoleBasedRoute allowedRoles={allowedRoles}>
            <Suspense fallback={<PageLoader />}>
              <Element />
            </Suspense>
          </RoleBasedRoute>
        </RouteErrorBoundary>
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
    element: (
      <ErrorBoundary>
        <AuthInitWrapper />
      </ErrorBoundary>
    ),
    children: [
      // Public routes with Suspense and error boundaries
      ...publicRoutes.map(({ path, element: Element, title }) => ({
        path,
        element: (
          <RouteErrorBoundary routeName={title}>
            <PublicRouteWrapper>
              <Suspense fallback={<PageLoader />}>
                <Element />
              </Suspense>
            </PublicRouteWrapper>
          </RouteErrorBoundary>
        ),
      })),
      // Protected routes with layout error boundary
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <ProtectedLayoutWrapper />
          </ErrorBoundary>
        ),
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
