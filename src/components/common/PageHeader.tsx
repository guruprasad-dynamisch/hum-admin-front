import React from 'react'
import { cn } from '@utils/classNames'
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb'
import '@styles/components/page-header.scss'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumb?: boolean
  className?: string
}

export default function PageHeader({ 
  title, 
  subtitle, 
  actions, 
  breadcrumbs,
  showBreadcrumb = true,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn('page-header', className)}>
      <div className="page-header-content">
        {/* Title */}
        <h1 className="page-title">{title}</h1>
        
        {/* Breadcrumbs */}
        {showBreadcrumb && breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} />
        )}
        
        {/* Subtitle */}
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
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
