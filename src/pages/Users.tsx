import { useMemo, useState } from 'react'
import PageHeader from '@components/common/PageHeader'
import PageTopBar from '@components/common/PageTopBar'
import DataTable from '@components/common/DataTable'
import TableFilters, { FilterConfig } from '@components/common/TableFilters'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'
import { MOCK_USERS, User } from '@constants/mock-users'
import { getUserColumns } from '@config/users/columnDefinitions'
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from '@config/users/filterOptions'
import '@styles/components/user-table.scss'

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleAddUser = () => {
    console.log('Add user clicked')
    // TODO: Open add user modal
  }

  const handleExport = () => {
    console.log('Export clicked')
    // TODO: Implement export functionality
  }

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user)
    // TODO: Open edit user modal
  }

  const handleDeleteUser = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      console.log('Delete user:', user.id)
      // TODO: Implement delete functionality
    }
  }

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    const filtered = MOCK_USERS.filter((user) => {
      const matchesSearch =
        searchQuery === '' ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = roleFilter === '' || user.role === roleFilter
      const matchesStatus = statusFilter === '' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
    
    console.log('📊 Pagination Debug:', {
      totalUsers: filtered.length,
      pageSize: 10,
      expectedPages: Math.ceil(filtered.length / 10)
    })
    
    return filtered
  }, [searchQuery, roleFilter, statusFilter])

  // Define table columns with handlers
  const columns = useMemo(
    () => getUserColumns({
      onEdit: handleEditUser,
      onDelete: handleDeleteUser
    }),
    []
  )

  // Define filters
  const filters: FilterConfig[] = [
    {
      id: 'search',
      type: 'search',
      placeholder: 'Search users...',
      value: searchQuery,
      onChange: setSearchQuery
    },
    {
      id: 'role',
      type: 'select',
      options: USER_ROLE_OPTIONS,
      value: roleFilter,
      onChange: setRoleFilter
    },
    {
      id: 'status',
      type: 'select',
      options: USER_STATUS_OPTIONS,
      value: statusFilter,
      onChange: setStatusFilter
    }
  ]

  return (
    <>
      {/* Top Bar with Page Title and Actions */}
      <PageTopBar
        leftContent={
          <div className="page-title">User Management</div>
        }
        rightContent={
          <>
            <PrimaryBtn onClick={handleAddUser} icon={<span>➕</span>}>
              Add User
            </PrimaryBtn>
            <SecondaryBtn onClick={handleExport} icon={<span>📥</span>}>
              Export
            </SecondaryBtn>
          </>
        }
      />
      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        {/* Filters */}
        <TableFilters filters={filters} />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pageSize={10}
        />
      </div>
    </>
  )
}
