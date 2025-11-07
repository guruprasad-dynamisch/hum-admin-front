import React from 'react'
import '@styles/components/live-badge.scss'

interface LiveBadgeProps {
  className?: string;
}

const LiveBadge = ({ className = '' }: LiveBadgeProps) => {
  return (
    <span className={`live-badge ${className}`}>
      🔴 LIVE
    </span>
  )
}

export default LiveBadge
