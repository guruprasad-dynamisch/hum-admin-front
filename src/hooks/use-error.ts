import { HttpCodes } from "@constants/httpcode.constants";
import { SOMETHING_WENT_WRONG, TOO_MANY_ATTEMPTS } from "@constants/message-constants";
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
    if (error?.response?.status === HttpCodes.TOO_MANY_REQUESTS) {
      return error?.response?.data?.message || TOO_MANY_ATTEMPTS;
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
   * @param fieldMapping - Optional mapping of backend field names to frontend field names
   * @example
   * // Example with field mapping
   * handleFieldErrors(error, setError, [], {
   *   'user_email': 'email',     // maps backend 'user_email' to frontend 'email'
   *   'phone_number': 'phone'    // maps backend 'phone_number' to frontend 'phone'
   * });
   * @returns true if field errors were found and set, false otherwise
   */
  const handleFieldErrors = <T extends FieldValues>(
    error: any,
    setError: UseFormSetError<T>,
    ignoreFields: string[] = [],
    fieldMapping: Record<string, string> = {}
  ): boolean => {
    const backendErrors = error?.errors || error?.response?.data?.data?.errors;

    if (!backendErrors || typeof backendErrors !== 'object') {
      return false;
    }

    let hasErrors = false;

    Object.entries(backendErrors).forEach(([backendField, errors]) => {
      // Skip fields that should be ignored
      if (ignoreFields.includes(backendField)) {
        return;
      }

      // Determine the frontend field name using mapping or fallback to backend field name
      const frontendField = fieldMapping[backendField] || backendField;

      if (Array.isArray(errors) && errors.length > 0) {
        setError(frontendField as Path<T>, {
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
