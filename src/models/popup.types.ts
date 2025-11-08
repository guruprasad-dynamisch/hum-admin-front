/**
 * Type definitions for the Popup System
 * 
 * This file provides centralized type exports for the popup system
 */

import { CSSProperties, ReactNode } from 'react';

/**
 * Button configuration for popup
 */
export interface PopupButton {
  /** Button text or React element */
  text: string | ReactNode;
  /** Callback when button is clicked */
  onPress?: () => void | Promise<void>;
  /** Button variant: 'primary', 'secondary', 'danger', 'warning', 'info', 'success' */
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
  /** Additional inline styles */
  style?: CSSProperties;
  /** Custom className */
  className?: string;
  /** Loading state for async operations */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Popup customization options
 */
export interface PopupOptions {
  /** Whether popup can be closed by clicking outside or pressing ESC */
  cancelable?: boolean;
  /** Icon to display in the header */
  icon?: ReactNode;
  /** Custom className for the icon */
  iconClassName?: string;
  /** Custom className for the modal overlay */
  overlayClassName?: string;
  /** Inline styles for the modal overlay */
  overlayStyle?: CSSProperties;
  /** Custom className for the modal dialog */
  dialogClassName?: string;
  /** Inline styles for the modal dialog */
  dialogStyle?: CSSProperties;
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
  /** Callback when popup closes */
  onClose?: () => void;
  /** Show close button in header */
  showCloseButton?: boolean;
}

/**
 * Popup data structure
 */
export interface PopupData {
  /** Popup title */
  title?: string;
  /** Message content (string or React element) */
  message: string | ReactNode;
}

/**
 * Return type for showPopup function
 */
export interface PopupController {
  /** Programmatically close the popup */
  close: () => void;
}

/**
 * Popup variant types
 */
export type PopupVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Extended popup options with variant-specific defaults
 */
export interface PopupMessageOptions extends Omit<PopupOptions, 'icon'> {
  /** Custom icon (overrides default variant icon) */
  icon?: ReactNode;
  /** Custom buttons (overrides default OK button) */
  buttons?: PopupButton[];
}

/**
 * Confirmation popup options
 */
export interface ConfirmationOptions extends PopupMessageOptions {
  /** Dialog title */
  title?: string;
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
 * Hook return type for usePopupMessages
 */
export interface UsePopupMessagesReturn {
  /** Show success popup */
  showSuccessPopup: (message?: string | ReactNode, options?: PopupMessageOptions) => PopupController;
  /** Show error popup */
  showErrorPopup: (message?: string | ReactNode, options?: PopupMessageOptions) => PopupController;
  /** Show error popup with custom title */
  showErrorPopupWithTitle: (title: string, message?: string | ReactNode, options?: PopupMessageOptions) => PopupController;
  /** Show warning popup */
  showWarningPopup: (message?: string | ReactNode, options?: PopupMessageOptions) => PopupController;
  /** Show info popup */
  showInfoPopup: (message?: string | ReactNode, options?: PopupMessageOptions) => PopupController;
  /** Show confirmation dialog */
  showConfirmation: (message: string | ReactNode, options?: ConfirmationOptions) => Promise<boolean>;
  /** Show loading popup */
  showLoadingPopup: (message?: string | ReactNode, title?: string) => PopupController;
  /** Show custom popup */
  showCustomPopup: (title: string, message: string | ReactNode, buttons: PopupButton[], options?: PopupOptions) => PopupController;
}
