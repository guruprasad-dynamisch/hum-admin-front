import { Column, Row } from 'react-table'
import { User } from '@constants/mock-users'
import UserCell from '@components/tables/cells/UserCell'
import BadgeCell from '@components/tables/cells/BadgeCell'
import ActionCell from '@components/tables/cells/ActionCell'

interface ColumnHandlers {
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
}

export const getUserColumns = (handlers?: ColumnHandlers): Column<User>[] => [
  {
    Header: 'User',
    accessor: 'firstName',
    Cell: ({ row }: { row: Row<User> }) => (
      <UserCell
        firstName={row.original.firstName}
        lastName={row.original.lastName}
        email={row.original.email}
      />
    )
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value }: { value: 'admin' | 'user' }) => <BadgeCell value={value} />
  },
  {
    Header: 'Organization',
    accessor: 'organization'
  },
  {
    Header: 'Last Login',
    accessor: 'lastLogin'
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }: { value: 'active' | 'inactive' }) => <BadgeCell value={value} />
  },
  {
    Header: 'Actions',
    id: 'actions',
    Cell: ({ row }: { row: Row<User> }) => (
      <ActionCell
        row={row.original}
        onEdit={handlers?.onEdit}
        onDelete={handlers?.onDelete}
      />
    )
  }
]
