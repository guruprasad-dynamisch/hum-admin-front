import React from 'react'
import { Modal as BootstrapModal } from 'react-bootstrap'
import FocusLock from 'react-focus-lock'
import { cn } from '@utils/classNames'

export interface ModalProps {
  /** Show/hide modal */
  show: boolean
  /** Callback when modal should close */
  onHide: () => void
  /** Modal title */
  title?: string
  /** Modal size */
  size?: 'sm' | 'lg' | 'xl'
  /** Center modal vertically */
  centered?: boolean
  /** Modal content */
  children: React.ReactNode
  /** Additional className for modal */
  className?: string
  /** Additional className for modal dialog */
  dialogClassName?: string
  /** Show close button */
  showCloseButton?: boolean
  /** Backdrop click closes modal */
  backdrop?: boolean | 'static'
  /** Show backdrop */
  keyboard?: boolean
  /** Footer content */
  footer?: React.ReactNode
  /** Custom header content (replaces title) */
  header?: React.ReactNode
}

/**
 * Reusable Modal Component using React Bootstrap
 * 
 * @example
 * <Modal
 *   show={isOpen}
 *   onHide={() => setIsOpen(false)}
 *   title="My Modal"
 *   size="lg"
 * >
 *   <p>Modal content here</p>
 * </Modal>
 */
const Modal: React.FC<ModalProps> = ({
  show,
  onHide,
  title,
  size,
  centered = true,
  children,
  className,
  dialogClassName,
  showCloseButton = true,
  backdrop = true,
  keyboard = true,
  footer,
  header
}) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      backdrop={backdrop}
      keyboard={keyboard}
      dialogClassName={cn('custom-modal-dialog', dialogClassName)}
      className={cn('custom-modal', className)}
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-modal="true"
      role="dialog"
    >
      <FocusLock disabled={!show} returnFocus>
        {(header || title) && (
          <BootstrapModal.Header closeButton={showCloseButton} className="custom-modal-header">
            {header || (
              <BootstrapModal.Title id="modal-title" className="custom-modal-title">
                {title}
              </BootstrapModal.Title>
            )}
          </BootstrapModal.Header>
        )}

        <BootstrapModal.Body className="custom-modal-body">
          {children}
        </BootstrapModal.Body>

        {footer && (
          <BootstrapModal.Footer className="custom-modal-footer">
            {footer}
          </BootstrapModal.Footer>
        )}
      </FocusLock>
    </BootstrapModal>
  )
}

export default Modal
