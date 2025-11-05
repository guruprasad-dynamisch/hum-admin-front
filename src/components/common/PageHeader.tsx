import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/page-header.scss'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: Array<{ label: string; path?: string }>
  className?: string
}

export default function PageHeader({ 
  title, 
  subtitle, 
  actions, 
  breadcrumbs,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn('page-header', className)}>
      <div className="page-header-content">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.path ? (
                  <a href={crumb.path} className="breadcrumb-item">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="breadcrumb-item active">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Title and Subtitle */}
        <div className="page-header-text">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* Actions */}
      {actions && (
        <div className="page-header-actions">
          {actions}
        </div>
      )}
    </div>
  )
}
