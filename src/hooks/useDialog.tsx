import React from 'react';
import showDialog, { DialogButton, DialogOptions, DialogController } from '@utils/showDialog';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

/**
 * Default messages
 */
const DEFAULT_SUCCESS_MESSAGE = 'Operation completed successfully!';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';
const DEFAULT_WARNING_MESSAGE = 'Please review your action.';
const DEFAULT_INFO_MESSAGE = 'Information';

/**
 * Dialog variant types
 */
export type DialogVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Extended dialog options with variant-specific defaults
 */
export interface DialogMessageOptions extends Omit<DialogOptions, 'icon'> {
  /** Custom icon (overrides default variant icon) */
  icon?: React.ReactNode;
  /** Custom buttons (overrides default OK button) */
  buttons?: DialogButton[];
}

/**
 * Confirmation dialog options
 */
export interface ConfirmationOptions extends DialogMessageOptions {
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Variant for confirm button */
  confirmVariant?: 'primary' | 'danger' | 'warning' | 'info' | 'success';
  /** Show cancel button */
  showCancel?: boolean;
}

/**
 * Custom hook for displaying themed dialog messages
 * 
 * @returns Object with dialog utility functions
 * 
 * @example
 * const { showSuccessDialog, showErrorDialog, showConfirmation } = useDialogMessages();
 * 
 * // Success message
 * showSuccessDialog('User created successfully!');
 * 
 * // Error with custom title
 * showErrorDialog('Failed to save data', { title: 'Save Error' });
 * 
 * // Confirmation dialog
 * const confirmed = await showConfirmation('Delete this item?', {
 *   title: 'Confirm Delete',
 *   confirmText: 'Delete',
 *   confirmVariant: 'danger'
 * });
 */
export function useDialogMessages() {
  /**
   * Get default icon for variant
   */
  const getVariantIcon = (variant: DialogVariant): React.ReactNode => {
    const iconProps = { size: 48 };
    
    switch (variant) {
      case 'success':
        return <FiCheckCircle {...iconProps} />;
      case 'error':
        return <FiAlertCircle {...iconProps} />;
      case 'warning':
        return <FiAlertTriangle {...iconProps} />;
      case 'info':
        return <FiInfo {...iconProps} />;
      default:
        return null;
    }
  };

  /**
   * Get default title for variant
   */
  const getVariantTitle = (variant: DialogVariant): string => {
    switch (variant) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return '';
    }
  };

  /**
   * Show a dialog with variant-specific styling
   */
  const showVariantDialog = (
    variant: DialogVariant,
    message: string | React.ReactNode,
    title?: string,
    options: DialogMessageOptions = {}
  ): DialogController => {
    const {
      icon = getVariantIcon(variant),
      buttons = [{ text: 'OK', variant: 'primary' }],
      iconClassName = `dialog-icon-${variant}`,
      ...restOptions
    } = options;

    return showDialog(
      {
        title: title || getVariantTitle(variant),
        message
      },
      buttons,
      {
        icon,
        iconClassName,
        cancelable: false,
        centered: true,
        size: 'sm',
        ...restOptions
      }
    );
  };

  /**
   * Show success dialog
   */
  const showSuccessDialog = (
    message: string | React.ReactNode = DEFAULT_SUCCESS_MESSAGE,
    options: DialogMessageOptions = {}
  ): DialogController => {
    return showVariantDialog('success', message, options.titleClassName, options);
  };

  /**
   * Show error dialog
   */
  const showErrorDialog = (
    message: string | React.ReactNode = DEFAULT_ERROR_MESSAGE,
    options: DialogMessageOptions = {}
  ): DialogController => {
    return showVariantDialog('error', message, undefined, options);
  };

  /**
   * Show error dialog with custom title
   */
  const showErrorDialogWithTitle = (
    title: string,
    message: string | React.ReactNode = DEFAULT_ERROR_MESSAGE,
    options: DialogMessageOptions = {}
  ): DialogController => {
    return showVariantDialog('error', message, title, options);
  };

  /**
   * Show warning dialog
   */
  const showWarningDialog = (
    message: string | React.ReactNode = DEFAULT_WARNING_MESSAGE,
    options: DialogMessageOptions = {}
  ): DialogController => {
    return showVariantDialog('warning', message, undefined, options);
  };

  /**
   * Show info dialog
   */
  const showInfoDialog = (
    message: string | React.ReactNode = DEFAULT_INFO_MESSAGE,
    options: DialogMessageOptions = {}
  ): DialogController => {
    return showVariantDialog('info', message, undefined, options);
  };

  /**
   * Show confirmation dialog
   * Returns a promise that resolves to true if confirmed, false if cancelled
   */
  const showConfirmation = (
    message: string | React.ReactNode,
    options: ConfirmationOptions = {}
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const {
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        confirmVariant = 'primary',
        showCancel = true,
        icon = <FiAlertCircle size={48} />,
        ...restOptions
      } = options;

      const buttons: DialogButton[] = [];

      if (showCancel) {
        buttons.push({
          text: cancelText,
          variant: 'secondary',
          onPress: () => resolve(false)
        });
      }

      buttons.push({
        text: confirmText,
        variant: confirmVariant,
        onPress: () => resolve(true)
      });

      showDialog(
        {
          title: restOptions.titleClassName || 'Confirm Action',
          message
        },
        buttons,
        {
          icon,
          iconClassName: 'dialog-icon-warning',
          cancelable: showCancel,
          centered: true,
          size: 'sm',
          onClose: () => resolve(false),
          ...restOptions
        }
      );
    });
  };

  /**
   * Show loading dialog (no buttons, must be closed programmatically)
   */
  const showLoadingDialog = (
    message: string | React.ReactNode = 'Loading...',
    title?: string
  ): DialogController => {
    return showDialog(
      {
        title: title || 'Please Wait',
        message
      },
      [], // No buttons
      {
        cancelable: false,
        centered: true,
        size: 'sm',
        showCloseButton: false,
        icon: (
          <div className="dialog-loading-spinner">
            <span className="hum-btn-spinner" />
          </div>
        )
      }
    );
  };

  /**
   * Show custom dialog with full control
   */
  const showCustomDialog = (
    title: string,
    message: string | React.ReactNode,
    buttons: DialogButton[],
    options: DialogOptions = {}
  ): DialogController => {
    return showDialog({ title, message }, buttons, options);
  };

  return {
    showSuccessDialog,
    showErrorDialog,
    showErrorDialogWithTitle,
    showWarningDialog,
    showInfoDialog,
    showConfirmation,
    showLoadingDialog,
    showCustomDialog,
    // Backward compatibility aliases
    showSuccessPopup: showSuccessDialog,
    showErrorPopup: showErrorDialog,
    showErrorPopupWithTitle: showErrorDialogWithTitle,
    showWarningPopup: showWarningDialog,
    showInfoPopup: showInfoDialog,
    showLoadingPopup: showLoadingDialog,
    showCustomPopup: showCustomDialog
  };
}

// Export with both names for backward compatibility
export default useDialogMessages;
export { useDialogMessages as usePopupMessages };
