import React from 'react'
import { cn } from '@utils/classNames'
import '@styles/components/icon-btn.scss'

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'gold'
  badge?: string | number
  className?: string
}

const IconBtn = ({
  children,
  size = 'md',
  variant = 'default',
  badge,
  className,
  disabled,
  type = 'button',
  ...props
}: IconBtnProps) => {
  const sizeClass = size === 'sm' ? 'icon-btn-sm' : size === 'lg' ? 'icon-btn-lg' : 'icon-btn-md'
  const variantClass = variant !== 'default' ? `icon-btn-${variant}` : ''

  return (
    <button
      type={type}
      className={cn('icon-btn', sizeClass, variantClass, className)}
      disabled={disabled}
      {...props}
    >
      {children}
      {badge && <span className="icon-btn-badge">{badge}</span>}
    </button>
  )
}

export default IconBtn
