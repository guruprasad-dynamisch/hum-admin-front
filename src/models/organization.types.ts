/**
 * Organization Types
 */

export interface Organization {
  id: string;
  name: string;
  tier: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrganizationDetails extends Organization {
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  contactPerson?: string;
}

export interface OrganizationTier {
  id: string;
  name: string;
  features: string[];
  limits?: {
    users?: number;
    storage?: number;
    projects?: number;
  };
}

export interface OrganizationCreateRequest {
  name: string;
  tier: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

export interface OrganizationUpdateRequest {
  id: string;
  name?: string;
  tier?: string;
  isActive?: boolean;
}