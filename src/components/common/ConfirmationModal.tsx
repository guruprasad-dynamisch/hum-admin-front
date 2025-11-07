import React from 'react'
import Modal from './Modal'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'
import { cn } from '@utils/classNames'
import '@styles/components/confirmation-modal.scss'

export interface ConfirmationModalProps {
  /** Show/hide modal */
  show: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Callback when user confirms */
  onConfirm: () => void
  /** Modal title */
  title?: string
  /** Confirmation message */
  message: string
  /** Confirm button text */
  confirmText?: string
  /** Cancel button text */
  cancelText?: string
  /** Variant for styling (danger, warning, info) */
  variant?: 'danger' | 'warning' | 'info'
  /** Loading state */
  loading?: boolean
  /** Icon to display */
  icon?: React.ReactNode
}

/**
 * Reusable Confirmation Modal Component
 * 
 * @example
 * <ConfirmationModal
 *   show={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   variant="danger"
 * />
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
  icon
}) => {
  const handleConfirm = () => {
    onConfirm()
    if (!loading) {
      onClose()
    }
  }

  return (
    <Modal
      show={show}
      onHide={onClose}
      title={title}
      size="sm"
      centered
      backdrop="static"
      keyboard={!loading}
      className={cn('confirmation-modal', `confirmation-modal-${variant}`)}
    >
      <div className="confirmation-modal-content">
        {icon && (
          <div className={cn('confirmation-modal-icon', `icon-${variant}`)}>
            {icon}
          </div>
        )}
        <p className="confirmation-modal-message">{message}</p>
      </div>

      <div className="confirmation-modal-actions">
        <SecondaryBtn
          onClick={onClose}
          disabled={loading}
          fullWidth={false}
          className="confirmation-modal-cancel"
        >
          {cancelText}
        </SecondaryBtn>
        <PrimaryBtn
          onClick={handleConfirm}
          loading={loading}
          disabled={loading}
          fullWidth={false}
          className={cn('confirmation-modal-confirm', `confirm-${variant}`)}
        >
          {confirmText}
        </PrimaryBtn>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
