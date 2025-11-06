import React from 'react'
import '@styles/components/sessions-table.scss'

interface SessionActionCellProps {
  sessionId: string
  isCurrent?: boolean
  status: 'active' | 'expired'
  onRevoke?: (sessionId: string) => void
}

export default function SessionActionCell({ 
  sessionId, 
  isCurrent, 
  status, 
  onRevoke 
}: SessionActionCellProps) {
  if (isCurrent || status !== 'active') {
    return <span>-</span>
  }

  return (
    <button
      className="revoke-btn"
      onClick={() => onRevoke && onRevoke(sessionId)}
    >
      Revoke
    </button>
  )
}
