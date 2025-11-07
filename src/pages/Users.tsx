import { useMemo, useState } from 'react'
import PageHeader from '@components/common/PageHeader'
import PageTopBar from '@components/common/PageTopBar'
import DataTable from '@components/common/DataTable'
import TableFilters, { FilterConfig } from '@components/common/TableFilters'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'
import UserModal from '@components/modals/UserModal'
import { MOCK_USERS, User } from '@constants/mock-users'
import { getUserColumns } from '@config/users/columnDefinitions'
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from '@config/users/filterOptions'
import { UserFormData } from '@validations/user-validations'
import { useModal } from '@hooks/index'
import { exportToCSV, getDateString } from '@utils/exportHelpers'
import '@styles/components/user-table.scss'

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const modal = useModal()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(MOCK_USERS)

  const handleAddUser = () => {
    setSelectedUser(null)
    modal.open()
  }

  const handleExport = () => {
    // Prepare data for export (exclude id and format for CSV)
    const exportData = users.map(user => ({
      'First Name': user.firstName,
      'Last Name': user.lastName,
      'Email': user.email,
      'Phone': user.phone,
      'Role': user.role,
      'Organization': user.organization,
      'Status': user.status,
      'Last Login': user.lastLogin
    }))

    // Export to CSV with date-stamped filename
    exportToCSV(exportData, `users_export_${getDateString()}`)
    console.log(`Exported ${users.length} users to CSV`)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    modal.open()
  }

  const handleDeleteUser = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id))
    }
  }

  const handleSubmitUser = async (data: UserFormData) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === selectedUser.id
            ? {
                ...u,
                ...data,
                lastLogin: u.lastLogin // Keep existing lastLogin
              }
            : u
        )
      )
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now(),
        ...data,
        lastLogin: 'Just now',
        status: data.status || 'active'
      }
      setUsers(prevUsers => [...prevUsers, newUser])
    }
    modal.close()
  }

  const handleCloseModal = () => {
    modal.close()
    setSelectedUser(null)
  }

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        searchQuery === '' ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = roleFilter === '' || user.role === roleFilter
      const matchesStatus = statusFilter === '' || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
    
    return filtered
  }, [users, searchQuery, roleFilter, statusFilter])

  // Define table columns with handlers
  const columns = useMemo(
    () => getUserColumns({
      onEdit: handleEditUser,
      onDelete: handleDeleteUser
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      {/* Add/Edit User Modal */}
      <UserModal
        show={modal.show}
        onClose={handleCloseModal}
        user={selectedUser}
        onSubmit={handleSubmitUser}
      />
    </>
  )
}
