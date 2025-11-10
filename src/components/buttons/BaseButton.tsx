import React from 'react'
import { cn } from '@utils/classNames'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'danger' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode
  /** Visual style variant */
  variant?: ButtonVariant
  /** Button size */
  size?: ButtonSize
  /** Full width button */
  fullWidth?: boolean
  /** Loading state */
  loading?: boolean
  /** Icon to display on the left */
  iconLeft?: React.ReactNode
  /** Icon to display on the right */
  iconRight?: React.ReactNode
  /** Accessible label (required for icon-only buttons) */
  'aria-label'?: string
  /** Additional CSS class */
  className?: string
}

/**
 * BaseButton - Standardized button component with consistent API
 * 
 * @example
 * <BaseButton variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </BaseButton>
 * 
 * @example
 * <BaseButton variant="primary" iconLeft={<Icon />} aria-label="Save">
 *   Save
 * </BaseButton>
 */
const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      className,
      type = 'button',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const variantClass = `hum-btn-${variant}`
    const sizeClass = `hum-btn-${size}`

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'hum-btn',
          variantClass,
          sizeClass,
          {
            'hum-btn-full-width': fullWidth,
            'hum-btn-loading': loading
          },
          className
        )}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-busy={loading}
        {...props}
      >
        <span className="hum-btn-content">
          {loading && <span className="hum-btn-spinner" role="status" aria-label="Loading" />}
          {!loading && iconLeft && <span className="hum-btn-icon-left">{iconLeft}</span>}
          {children}
          {!loading && iconRight && <span className="hum-btn-icon-right">{iconRight}</span>}
        </span>
      </button>
    )
  }
)

BaseButton.displayName = 'BaseButton'

export default BaseButton
