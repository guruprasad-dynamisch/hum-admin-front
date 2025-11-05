// Common types for async operations
export interface AsyncState<T = any> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export interface AsyncThunkConfig {
    rejectValue?: string | object;
    state?: unknown;
    dispatch?: unknown;
}

// Standard async thunk return types
export interface AsyncThunkSuccess<T = any> {
    data: T;
    message?: string;
}

export interface AsyncThunkError {
    message: string;
    code?: string | number;
    details?: any;
}

// Utility type for creating async thunk types
export type CreateAsyncThunkReturn<TData = any, TError = string> =
    | AsyncThunkSuccess<TData>
    | AsyncThunkError;

// Common async operation states
export type AsyncOperationStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

// Extended async state with status
export interface ExtendedAsyncState<T = any> extends AsyncState<T> {
    status: AsyncOperationStatus;
    lastFetch?: number; // timestamp of last successful fetch
}

// Common error handling utility
export const handleAsyncError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'An unknown error occurred';
};
