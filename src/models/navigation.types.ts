import { Role } from '@constants/roles';

export interface NavigationItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  roles?: Role[];
}

export type NavigationHandlers = {
  onNavigate?: (path: string) => void;
  onToggle?: (itemId: string) => void;
};

export interface BreadcrumbItem {
  label: string;
  path?: string;
}