import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@redux/store';
import { selectIsAuthenticated } from '@redux/slices/authSlice';
import { getRouteByKey } from '@utils/helpers';

interface Props { children: React.ReactNode }

export default function PublicRoute({ children }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={getRouteByKey('dashboard')} replace state={{ from: location }} />
  }

  return <>{children}</>
}
