import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Modal } from 'react-bootstrap';
import { cn } from './classNames';
import { logger } from './logger';
import '../styles/components/popup.scss';

/**
 * Button configuration for popup
 */
export interface DialogButton {
  /** Button text or React element */
  text: string | React.ReactNode;
  /** Callback when button is clicked */
  onPress?: () => void | Promise<void>;
  /** Button variant: 'primary', 'secondary', 'danger', 'warning', 'info', 'success' */
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Custom className */
  className?: string;
  /** Loading state for async operations */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-focus this button on dialog open */
  autoFocus?: boolean;
  /** Keyboard shortcut (e.g., 'Enter', 'Escape') */
  shortcut?: string;
}

/**
 * Popup customization options
 */
export interface DialogOptions {
  /** Whether dialog can be closed by clicking outside or pressing ESC */
  cancelable?: boolean;
  /** Icon to display in the header */
  icon?: React.ReactNode;
  /** Custom className for the icon */
  iconClassName?: string;
  /** Custom className for the modal overlay */
  overlayClassName?: string;
  /** Inline styles for the modal overlay */
  overlayStyle?: React.CSSProperties;
  /** Custom className for the modal dialog */
  dialogClassName?: string;
  /** Inline styles for the modal dialog */
  dialogStyle?: React.CSSProperties;
  /** Custom className for the modal content */
  contentClassName?: string;
  /** Custom className for the title */
  titleClassName?: string;
  /** Custom className for the message body */
  messageClassName?: string;
  /** Custom className for the buttons container */
  buttonsClassName?: string;
  /** Modal size: 'sm', 'lg', 'xl' */
  size?: 'sm' | 'lg' | 'xl';
  /** Enable/disable animation */
  animation?: boolean;
  /** Custom className for the backdrop */
  backdropClassName?: string;
  /** Center modal vertically */
  centered?: boolean;
  /** Auto-close after specified milliseconds */
  autoClose?: number;
  /** Callback when dialog opens */
  onOpen?: () => void;
  /** Callback when dialog closes */
  onClose?: () => void;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Custom footer content (replaces buttons) */
  customFooter?: React.ReactNode;
  /** Prevent closing on button click (manual control) */
  preventAutoClose?: boolean;
}

/**
 * Popup data structure
 */
export interface DialogData {
  /** Dialog title */
  title?: string;
  /** Message content (string or React element) */
  message: string | React.ReactNode;
  /** Optional subtitle */
  subtitle?: string;
}

/**
 * Return type for showPopup function
 */
export interface DialogController {
  /** Programmatically close the dialog */
  close: () => void;
  /** Check if dialog is currently open */
  isOpen: () => boolean;
}

/**
 * Displays a fully customizable dialog modal with theme-matched styling.
 * Advanced features include async button handlers, auto-close, custom footers, and programmatic control.
 *
 * @param dialogData - The dialog content (title and message)
 * @param buttons - Array of button configurations (default: single OK button)
 * @param options - Additional customization options
 * @returns DialogController object with close method
 *
 * @example
 * // Simple alert
 * showDialog({ title: 'Success', message: 'Operation completed!' });
 *
 * @example
 * // Confirmation dialog
 * showDialog(
 *   { title: 'Delete Item', message: 'Are you sure?' },
 *   [
 *     { text: 'Cancel', variant: 'secondary' },
 *     { text: 'Delete', variant: 'danger', onPress: handleDelete }
 *   ],
 *   { cancelable: true, icon: <TrashIcon /> }
 * );
 *
 * @example
 * // Advanced: Custom styled dialog with callbacks
 * const dialog = showDialog(
 *   { title: 'Custom Dialog', message: <CustomComponent /> },
 *   [{ text: 'Close' }],
 *   { 
 *     size: 'lg', 
 *     centered: true, 
 *     autoClose: 5000,
 *     onOpen: () => console.log('Dialog opened'),
 *     onClose: () => console.log('Dialog closed')
 *   }
 * );
 * // Later: dialog.close();
 */
const showDialog = (
  { title, message, subtitle }: DialogData,
  buttons: DialogButton[] = [{ text: 'OK', variant: 'primary' }],
  options: DialogOptions = {}
): DialogController => {
  const {
    cancelable = false,
    icon,
    iconClassName,
    overlayClassName,
    overlayStyle,
    dialogClassName,
    dialogStyle,
    contentClassName,
    titleClassName,
    messageClassName,
    buttonsClassName,
    size = 'sm',
    animation = true,
    backdropClassName,
    centered = true,
    autoClose,
    onOpen,
    onClose,
    showCloseButton = true,
    customFooter,
    preventAutoClose = false
  } = options;

  // Create container for the dialog
  const dialogContainer = document.createElement('div');
  dialogContainer.className = 'dialog-root-container';
  document.body.appendChild(dialogContainer);

  let externalClose: (() => void) | null = null;
  let isDialogOpen = true;

  /**
   * Dialog Component
   */
  const DialogComponent: React.FC = () => {
    const [show, setShow] = useState(true);
    const [buttonStates, setButtonStates] = useState<Record<number, boolean>>({});
    const firstButtonRef = useRef<HTMLButtonElement>(null);
    const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      // Trigger onOpen callback
      if (onOpen) {
        onOpen();
      }

      // Focus first button or auto-focus button on mount
      const autoFocusButton = buttons.findIndex(btn => btn.autoFocus);
      if (autoFocusButton !== -1) {
        // Focus auto-focus button if specified
        setTimeout(() => {
          const buttonElements = document.querySelectorAll('.custom-dialog-footer button');
          if (buttonElements[autoFocusButton]) {
            (buttonElements[autoFocusButton] as HTMLButtonElement).focus();
          }
        }, 100);
      } else if (firstButtonRef.current) {
        firstButtonRef.current.focus();
      }

      // Setup keyboard shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        buttons.forEach((button, index) => {
          if (button.shortcut && e.key === button.shortcut) {
            e.preventDefault();
            handleButtonClick(button, index);
          }
        });
      };
      window.addEventListener('keydown', handleKeyDown);

      // Setup auto-close timer
      if (autoClose && autoClose > 0) {
        autoCloseTimerRef.current = setTimeout(() => {
          closeDialog();
        }, autoClose);
      }

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        if (autoCloseTimerRef.current) {
          clearTimeout(autoCloseTimerRef.current);
        }
      };
    }, []);

    /**
     * Closes the dialog and cleans up
     */
    const closeDialog = () => {
      setShow(false);
      isDialogOpen = false;
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
      setTimeout(() => {
        if (document.body.contains(dialogContainer)) {
          document.body.removeChild(dialogContainer);
        }
        if (onClose) {
          onClose();
        }
      }, 300); // Wait for animation to complete
    };

    /**
     * Handles button click with loading state
     */
    const handleButtonClick = async (button: DialogButton, index: number) => {
      if (button.disabled || buttonStates[index]) return;

      try {
        if (button.onPress) {
          setButtonStates(prev => ({ ...prev, [index]: true }));
          await button.onPress();
          setButtonStates(prev => ({ ...prev, [index]: false }));
        }
        
        // Only auto-close if not prevented
        if (!preventAutoClose) {
          closeDialog();
        }
      } catch (error) {
        logger.error('Error in dialog button handler', error);
        setButtonStates(prev => ({ ...prev, [index]: false }));
      }
    };

    /**
     * Handles modal close event (backdrop click or ESC key)
     */
    const handleClose = () => {
      if (cancelable) {
        closeDialog();
      }
    };

    // Expose close function externally
    externalClose = closeDialog;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={cancelable ? true : 'static'}
        keyboard={cancelable}
        centered={centered}
        size={size}
        animation={animation}
        className={cn('custom-dialog', overlayClassName)}
        style={overlayStyle}
        contentClassName={cn('custom-dialog-content', contentClassName)}
        dialogClassName={cn('custom-dialog-dialog', dialogClassName)}
        backdropClassName={cn('custom-dialog-backdrop', backdropClassName)}
      >
        {title && (
          <Modal.Header
            closeButton={showCloseButton && cancelable}
            className={cn('custom-dialog-header', titleClassName)}
          >
            <Modal.Title className="custom-dialog-title">
              {title}
              {subtitle && <div className="custom-dialog-subtitle">{subtitle}</div>}
            </Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body className={cn('custom-dialog-body', messageClassName)}>
          {icon && (
            <div className={cn('custom-dialog-icon', iconClassName)}>
              {icon}
            </div>
          )}
          {message && (
            typeof message === 'string' ? (
              <p className="custom-dialog-message">{message}</p>
            ) : (
              message
            )
          )}
        </Modal.Body>

        {customFooter ? (
          <Modal.Footer className={cn('custom-dialog-footer', 'custom-dialog-footer-custom', buttonsClassName)}>
            {customFooter}
          </Modal.Footer>
        ) : buttons.length > 0 ? (
          <Modal.Footer className={cn('custom-dialog-footer', buttonsClassName)}>
            {buttons.map((button, index) => {
              const isLoading = button.loading || buttonStates[index];
              const isDisabled = button.disabled || isLoading;

              return (
                <button
                  key={index}
                  ref={index === 0 ? firstButtonRef : null}
                  className={cn(
                    'hum-btn',
                    `hum-btn-${button.variant || 'primary'}`,
                    button.className,
                    { 'hum-btn-loading': isLoading }
                  )}
                  style={button.style}
                  onClick={() => handleButtonClick(button, index)}
                  disabled={isDisabled}
                  type="button"
                >
                  <div className="hum-btn-content">
                    {isLoading && <span className="hum-btn-spinner" />}
                    {React.isValidElement(button.text) ? button.text : button.text}
                  </div>
                </button>
              );
            })}
          </Modal.Footer>
        ) : null}
      </Modal>
    );
  };

  // Render the dialog
  const root = ReactDOM.createRoot(dialogContainer);
  root.render(<DialogComponent />);

  // Return controller with enhanced API
  return {
    close: () => {
      if (externalClose) {
        externalClose();
      }
    },
    isOpen: () => isDialogOpen
  };
};

// Export with both names for backward compatibility
export default showDialog;
export { showDialog, showDialog as showPopup };
