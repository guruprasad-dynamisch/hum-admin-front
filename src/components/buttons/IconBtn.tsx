import React from 'react'
import { cn } from '@utils/classNames'

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'gold'
  badge?: string | number
  className?: string
  /** Accessible label for screen readers (required for icon-only buttons) */
  'aria-label'?: string
}

const IconBtn = ({
  children,
  size = 'md',
  variant = 'default',
  badge,
  className,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}: IconBtnProps) => {
  const sizeClass = size === 'sm' ? 'icon-btn-sm' : size === 'lg' ? 'icon-btn-lg' : 'icon-btn-md'
  const variantClass = variant !== 'default' ? `icon-btn-${variant}` : ''

  return (
    <button
      type={type}
      className={cn('icon-btn', sizeClass, variantClass, className)}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      {badge && <span className="icon-btn-badge" aria-label={`${badge} notifications`}>{badge}</span>}
    </button>
  )
}

export default IconBtn
