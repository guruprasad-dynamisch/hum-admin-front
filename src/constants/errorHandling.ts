import { AsyncThunkError, handleAsyncError } from '@redux/types/asyncTypes';
import { HttpCodes } from './httpcode.constants';

// Common error types
export enum ErrorTypes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Error classification utility
export const classifyError = (error: unknown): ErrorTypes => {
  // First, try to get error message using existing utility
  const errorMessage = handleAsyncError(error);

  // Check if error has response information (from axios errors)
  const axiosError = error as any;
  const status = axiosError?.response?.status;

  // If we have an actual HTTP status code, use it for classification
  if (status) {
    if (status === HttpCodes.UNAUTHORIZED) {
      return ErrorTypes.AUTHENTICATION_ERROR;
    }

    if (status === HttpCodes.FORBIDDEN) {
      return ErrorTypes.AUTHORIZATION_ERROR;
    }

    if (status === HttpCodes.BAD_REQUEST) {
      return ErrorTypes.VALIDATION_ERROR;
    }

    if (status >= 500) {
      return ErrorTypes.SERVER_ERROR;
    }

    if (status >= 400) {
      return ErrorTypes.CLIENT_ERROR;
    }
  }

  // Fall back to string-based classification for other cases
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return ErrorTypes.NETWORK_ERROR;
  }

  if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
    return ErrorTypes.AUTHENTICATION_ERROR;
  }

  if (errorMessage.includes('403') || errorMessage.includes('forbidden')) {
    return ErrorTypes.AUTHORIZATION_ERROR;
  }

  if (errorMessage.includes('400') || errorMessage.includes('validation')) {
    return ErrorTypes.VALIDATION_ERROR;
  }

  if (errorMessage.includes('500')) {
    return ErrorTypes.SERVER_ERROR;
  }

  return ErrorTypes.UNKNOWN_ERROR;
};

// Enhanced error object with classification
export interface ClassifiedError extends AsyncThunkError {
  type: ErrorTypes;
  timestamp: number;
  retryable: boolean;
}

// Create a classified error object
export const createClassifiedError = (error: unknown): ClassifiedError => {
  const message = handleAsyncError(error);
  const type = classifyError(error);

  return {
    message,
    type,
    timestamp: Date.now(),
    retryable: [ErrorTypes.NETWORK_ERROR, ErrorTypes.SERVER_ERROR].includes(type)
  };
};

// Common error messages for different error types
export const errorMessages = {
  [ErrorTypes.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection and try again.',
  [ErrorTypes.AUTHENTICATION_ERROR]: 'Authentication failed. Please log in again.',
  [ErrorTypes.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
  [ErrorTypes.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ErrorTypes.SERVER_ERROR]: 'Server error occurred. Please try again later.',
  [ErrorTypes.CLIENT_ERROR]: 'Invalid request. Please check your data and try again.',
  [ErrorTypes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.'
};

// Get user-friendly error message
export const getErrorMessage = (error: unknown): string => {
  const classifiedError = createClassifiedError(error);
  return errorMessages[classifiedError.type] || classifiedError.message;
};