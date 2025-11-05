import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { usePopup } from '@hooks/use-popup'
import { cn } from '@utils/classNames'
import '@styles/components/sidebar-item.scss'

interface SidebarItemProps {
  label: string
  path?: string
  icon: React.ReactNode
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
  collapsed?: boolean
  popupComponent?: React.ComponentType<any>
}

export default function SidebarItem({ label, path, icon, onClick, collapsed = false, popupComponent: PopupComponent }: SidebarItemProps) {
  const popup = usePopup()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (PopupComponent) {
      event.preventDefault()
      popup.open(event)
    }
    onClick?.(event)
  }

  const renderTooltip = (props: any) => (
    <Tooltip id={`tooltip-${label}`} {...props} className="sidebar-tooltip">
      {label}
    </Tooltip>
  )

  const buttonContent = (
    <>
      <span className="sidebar-nav-icon">{icon}</span>
      {!collapsed && <span className="sidebar-nav-label">{label}</span>}
    </>
  )

  // Only use NavLink if there's a path AND no popup component
  if (path && !PopupComponent) {
    const button = (
      <NavLink
        to={path}
        className={({ isActive }) => cn('sidebar-nav-item', {
          'collapsed': collapsed,
          'active': isActive
        })}
        onClick={handleClick}
      >
        {buttonContent}
      </NavLink>
    )

    return collapsed ? (
      <OverlayTrigger
        placement="right"
        overlay={renderTooltip}
        show={showTooltip}
        onToggle={(show) => setShowTooltip(show)}
      >
        {button}
      </OverlayTrigger>
    ) : button
  }

  // For items without path or with popup component
  const button = (
    <button
      className={cn('sidebar-nav-item', { 'collapsed': collapsed })}
      onClick={handleClick}
      type="button"
    >
      {buttonContent}
    </button>
  )

  return (
    <>
      {collapsed ? (
        <OverlayTrigger
          placement="right"
          overlay={renderTooltip}
          show={showTooltip}
          onToggle={(show) => setShowTooltip(show)}
        >
          {button}
        </OverlayTrigger>
      ) : button}
      {PopupComponent && (
        <PopupComponent 
          open={popup.isOpen}
          onClose={popup.close}
          anchorEl={popup.anchorEl}
        />
      )}
    </>
  )
}
