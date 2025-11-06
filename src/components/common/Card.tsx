import React, { ReactNode } from 'react'
import '@styles/components/card.scss'

export interface CardProps {
  /** Card title */
  title?: string
  /** Card content */
  children: ReactNode
  /** Additional CSS class */
  className?: string
  /** Optional actions in header */
  actions?: ReactNode
}

/**
 * Card Component
 * Container component for grouping related content
 * 
 * @example
 * <Card title="Personal Information">
 *   <p>Card content goes here</p>
 * </Card>
 */
const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  actions
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || actions) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card
