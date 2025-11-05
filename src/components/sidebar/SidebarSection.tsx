import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/sidebar-section.scss'

interface SidebarSectionProps {
  title?: string
  children: React.ReactNode
  showDivider?: boolean
  collapsed?: boolean
}

export default function SidebarSection({ title, children, showDivider = false, collapsed = false }: SidebarSectionProps) {
  return (
    <div className="sidebar-section">
      {title && (
        <div className={cn('sidebar-section-title', { 'collapsed': collapsed })}>
          {title}
        </div>
      )}
      <div className="sidebar-section-list">
        {children}
      </div>
      {showDivider && <div className="sidebar-section-divider" />}
    </div>
  )
}
