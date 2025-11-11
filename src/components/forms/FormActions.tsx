import React from 'react'
import { cn } from '@utils/classNames'
import PrimaryBtn from '../buttons/PrimaryBtn'
import SecondaryBtn from '../buttons/SecondaryBtn'

/**
 * Form actions component props
 */
interface FormActionsProps {
  /** Show submit button */
  showSubmitButton?: boolean
  /** Show cancel button */
  showCancelButton?: boolean
  /** Submit button text */
  submitButtonText?: string
  /** Cancel button text */
  cancelButtonText?: string
  /** Submit button loading state */
  isSubmitting?: boolean
  /** Cancel button click handler */
  onCancel?: () => void
  /** Submit button size */
  submitButtonSize?: 'small' | 'medium' | 'large'
  /** Alignment of buttons */
  alignment?: 'start' | 'center' | 'end' | 'space-between'
  /** Stack buttons on mobile */
  stackOnMobile?: boolean
  /** Reverse button order */
  reverseOrder?: boolean
  /** Button spacing */
  spacing?: string
  /** Button width */
  buttonWidth?: string
  /** Submit button className */
  submitButtonClassName?: string
  /** Cancel button className */
  cancelButtonClassName?: string
  /** Form actions className */
  className?: string
}

/**
 * FormActions Component
 * 
 * Reusable form action buttons (submit/cancel) with consistent styling.
 * Eliminates duplicate button rendering logic across forms.
 * 
 * @example
 * <FormActions
 *   showSubmitButton
 *   showCancelButton
 *   submitButtonText="Save"
 *   cancelButtonText="Cancel"
 *   isSubmitting={isLoading}
 *   onCancel={handleCancel}
 * />
 */
const FormActions: React.FC<FormActionsProps> = ({
  showSubmitButton = true,
  showCancelButton = false,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  isSubmitting = false,
  onCancel,
  submitButtonSize = 'medium',
  alignment = 'end',
  stackOnMobile = true,
  reverseOrder = false,
  spacing = '12px',
  buttonWidth,
  submitButtonClassName,
  cancelButtonClassName,
  className,
}) => {
  const getButtonClassName = () => {
    if (submitButtonSize === 'small') return 'btn-small'
    if (submitButtonSize === 'large') return 'btn-large'
    return ''
  }

  if (!showSubmitButton && !showCancelButton) {
    return null
  }

  return (
    <div
      className={cn(
        'form-actions',
        className,
        `justify-${alignment}`,
        stackOnMobile && 'stack-on-mobile',
        submitButtonSize === 'small' && 'justify-end'
      )}
      style={{
        gap: spacing,
        flexDirection: reverseOrder ? 'row-reverse' : 'row',
      }}
    >
      {showCancelButton && onCancel && (
        <SecondaryBtn
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={cn(getButtonClassName(), cancelButtonClassName)}
          fullWidth={false}
          style={buttonWidth ? { width: buttonWidth } : undefined}
        >
          {cancelButtonText}
        </SecondaryBtn>
      )}
      {showSubmitButton && (
        <PrimaryBtn
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          fullWidth={submitButtonSize !== 'small' && !showCancelButton}
          className={cn(getButtonClassName(), submitButtonClassName)}
          style={buttonWidth ? { width: buttonWidth } : undefined}
        >
          {submitButtonText}
        </PrimaryBtn>
      )}
    </div>
  )
}

export default FormActions
