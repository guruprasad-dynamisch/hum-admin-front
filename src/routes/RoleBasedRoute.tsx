import React from 'react';
import { Role } from '@constants/roles';
import { useRole } from '@hooks/use-role';
import NotFound from '@pages/NotFound';

interface Props {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export default function RoleBasedRoute({ children, allowedRoles }: Props) {
  const { canAccess } = useRole();

  if (!canAccess(allowedRoles)) {
    return <NotFound />;
  }

  return <>{children}</>;
}
