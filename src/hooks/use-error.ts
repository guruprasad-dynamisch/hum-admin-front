import { SOMETHING_WENT_WRONG } from "@constants/message-constants";
import { cleanErrorMessage, ucFirstLetter } from "@utils/helpers";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";

/**
 * Simple hook for error message extraction
 */
export const useError = () => {
  /**
   * Extract error message from error object
   * Checks common error message locations and handles rate limiting
   */
  const getError = (error: any, fallback: string = SOMETHING_WENT_WRONG): string => {
    // Handle rate limiting (429 status)
    if (error?.response?.status === 429) {
      return error?.response?.data?.message || "Too many attempts. Please try again in a few minutes.";
    }
    
    return error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      fallback;
  };

  /**
   * Handle backend field validation errors and bind them to form fields
   * @param error - The error object from API response
   * @param setError - react-hook-form's setError function
   * @param ignoreFields - Optional array of field names to ignore (e.g., non-input fields like tokens)
   * @returns true if field errors were found and set, false otherwise
   */
  const handleFieldErrors = <T extends FieldValues>(
    error: any,
    setError: UseFormSetError<T>,
    ignoreFields: string[] = []
  ): boolean => {
    const backendErrors = error?.response?.data?.data?.errors;

    if (!backendErrors || typeof backendErrors !== 'object') {
      return false;
    }

    let hasErrors = false;

    Object.entries(backendErrors).forEach(([field, errors]) => {
      // Skip fields that should be ignored
      if (ignoreFields.includes(field)) {
        return;
      }

      if (Array.isArray(errors) && errors.length > 0) {
        setError(field as Path<T>, {
          type: 'backend',
          message: ucFirstLetter(cleanErrorMessage(errors[0]))
        });
        hasErrors = true;
      }
    });

    return hasErrors;
  };

  return { getError, handleFieldErrors };
};
