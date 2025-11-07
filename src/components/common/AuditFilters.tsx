import React from 'react'
import SelectField from '@components/fields/SelectField'
import '@styles/components/audit-filters.scss'

interface AuditFiltersProps {
  dateRange: string;
  userFilter: string;
  actionFilter: string;
  moduleFilter: string;
  onDateRangeChange: (value: string) => void;
  onUserFilterChange: (value: string) => void;
  onActionFilterChange: (value: string) => void;
  onModuleFilterChange: (value: string) => void;
}

const AuditFilters = ({
  dateRange,
  userFilter,
  actionFilter,
  moduleFilter,
  onDateRangeChange,
  onUserFilterChange,
  onActionFilterChange,
  onModuleFilterChange
}: AuditFiltersProps) => {
  const dateRangeOptions = [
    { value: 'last24hours', label: 'Last 24 Hours' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ]

  const userOptions = [
    { value: '', label: 'All Users' },
    { value: 'alice', label: 'Alice Adams' },
    { value: 'bob', label: 'Bob Brown' },
    { value: 'carol', label: 'Carol Clark' }
  ]

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'login', label: 'Login' }
  ]

  const moduleOptions = [
    { value: '', label: 'All Modules' },
    { value: 'users', label: 'Users' },
    { value: 'templates', label: 'Templates' },
    { value: 'settings', label: 'Settings' }
  ]

  return (
    <div className="audit-filters">
      <div className="filter-group">
        <SelectField
          label="Date Range"
          value={dateRange}
          onChange={onDateRangeChange}
          options={dateRangeOptions}
          mode="standalone"
        />
      </div>

      <div className="filter-group">
        <SelectField
          label="User"
          value={userFilter}
          onChange={onUserFilterChange}
          options={userOptions}
          mode="standalone"
        />
      </div>

      <div className="filter-group">
        <SelectField
          label="Action Type"
          value={actionFilter}
          onChange={onActionFilterChange}
          options={actionOptions}
          mode="standalone"
        />
      </div>

      <div className="filter-group">
        <SelectField
          label="Module"
          value={moduleFilter}
          onChange={onModuleFilterChange}
          options={moduleOptions}
          mode="standalone"
        />
      </div>
    </div>
  )
}

export default AuditFilters
