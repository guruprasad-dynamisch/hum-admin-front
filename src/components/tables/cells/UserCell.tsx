interface UserCellProps {
  firstName: string
  lastName: string
  email: string
}

export default function UserCell({ firstName, lastName, email }: UserCellProps) {
  const initials = `${firstName[0]}${lastName[0]}`
  const fullName = `${firstName} ${lastName}`

  return (
    <div className="user-cell">
      <div className="user-avatar">{initials}</div>
      <div className="user-info">
        <div className="user-name">{fullName}</div>
        <div className="user-email">{email}</div>
      </div>
    </div>
  )
}
