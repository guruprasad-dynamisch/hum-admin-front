import { useSnackbar, VariantType, OptionsObject } from 'notistack';

/**
 * Custom hook for toast/snackbar notifications
 * Wraps notistack's useSnackbar with convenient methods
 */
export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Default options for top-right positioning
  const defaultOptions: OptionsObject = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  };

  /**
   * Show a basic snackbar notification
   * @param message - The message to display
   * @param options - Additional options for the snackbar
   */
  const showSnackbar = (message: string, options?: OptionsObject) => {
    return enqueueSnackbar(message, { ...defaultOptions, ...options });
  };

  /**
   * Show a success notification
   * @param message - The success message to display
   * @param options - Additional options for the snackbar
   */
  const showSuccess = (message: string, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration: 4000,
      ...defaultOptions,
      ...options
    });
  };

  /**
   * Show an error notification
   * @param message - The error message to display
   * @param options - Additional options for the snackbar
   */
  const showError = (message: string, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: 6000,
      ...defaultOptions,
      ...options
    });
  };

  /**
   * Show a warning notification
   * @param message - The warning message to display
   * @param options - Additional options for the snackbar
   */
  const showWarning = (message: string, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: 'warning',
      autoHideDuration: 5000,
      ...defaultOptions,
      ...options
    });
  };

  /**
   * Show an info notification
   * @param message - The info message to display
   * @param options - Additional options for the snackbar
   */
  const showInfo = (message: string, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: 'info',
      autoHideDuration: 4000,
      ...defaultOptions,
      ...options
    });
  };

  /**
   * Show a notification with a specific variant
   * @param message - The message to display
   * @param variant - The variant type (success, error, warning, info, default)
   * @param options - Additional options for the snackbar
   */
  const showVariant = (message: string, variant: VariantType, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant,
      ...defaultOptions,
      ...options
    });
  };

  /**
   * Close a specific snackbar by key
   * @param key - The snackbar key to close
   */
  const closeToast = (key: string | number) => {
    closeSnackbar(key);
  };

  /**
   * Close all open snackbars
   */
  const closeAllToasts = () => {
    closeSnackbar();
  };

  return {
    // Raw enqueueSnackbar function for advanced usage
    enqueueSnackbar,

    // Convenience methods with default durations and top-right positioning
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showVariant,

    // Management methods
    closeToast,
    closeAllToasts,
  };
};