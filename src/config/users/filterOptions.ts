import { FilterOption } from '@components/common/TableFilters'

export const USER_ROLE_OPTIONS: FilterOption[] = [
  { value: '', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' }
]

export const USER_STATUS_OPTIONS: FilterOption[] = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]
