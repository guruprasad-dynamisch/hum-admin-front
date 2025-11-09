export const SOMETHING_WENT_WRONG = `⚠️ Oops! Something went wrong. Please try again.`
export const TOO_MANY_ATTEMPTS = `Too many attempts. Please try again in a few minutes.`

export const VALIDATION_MESSAGE = {
    required: (field: string) => field ? `${field} is required!` : 'Required!',
    invalid: (field: string) => field ? `Invalid ${field}!` : 'Invalid!',

    // Length validations
    minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
    maxLength: (field: string, max: number) => `${field} must be at most ${max} characters`,
    exactLength: (field: string, length: number) => `${field} must be exactly ${length} characters`,

    // Pattern validations
    lettersOnly: (field: string) => `${field} can only contain letters and spaces`,
    numbersOnly: (field: string) => `${field} must contain only numbers`,

    // Password validations
    passwordMinLength: (min: number = 8) => `Password must be at least ${min} characters long`,
    passwordUppercase: 'Password must contain at least one uppercase letter',
    passwordLowercase: 'Password must contain at least one lowercase letter',
    passwordNumber: 'Password must contain at least one number',
    passwordSpecialChar: 'Password must contain at least one special character',
    passwordMatch: 'Passwords must match',

    // OTP validations
    otpLength: (length: number = 6) => `OTP must be exactly ${length} digits`,
    otpNumbersOnly: 'OTP must contain only numbers',
}

export const AUTH_MESSAGES = {
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    logoutSuccess: 'Logout successful',
    invalidResponse: 'Invalid response from server',
    missingUserData: 'Missing required user data',

    sendOtpSuccess: (phone: string) => `Verification code sent successfully to ${phone}`,
    sendOtpError: "Failed to send verification code. Please try again.",

    verifyOtpSuccess: 'OTP verified successfully',
    verifyOtpError: 'Invalid verification code. Please try again.',

    registerProfileSuccess: 'Your profile has been created successfully.',
    registerProfileError: 'Failed to create your profile. Please try again.',

    forgotPasswordSuccess: 'Password reset link has been sent to your email.',
    forgotPasswordError: 'Failed to send password reset link. Please try again.',

    verifyResetTokenSuccess: 'Token verified successfully.',
    verifyResetTokenError: 'Invalid or expired reset token. Please request a new password reset link.',

    resetPasswordSuccess: 'Your password has been reset successfully. You can now log in with your new password.',
    resetPasswordError: 'Failed to reset password. Please try again.',
}

export const ERROR_CODES = {
    INVALID_RESPONSE: 'INVALID_RESPONSE',
    LOGIN_ERROR: 'LOGIN_ERROR',
    MISSING_USER_DATA: 'MISSING_USER_DATA',
}

// Dialog Messages
export const DIALOG_MESSAGES = {
    // Template messages
    deleteTemplate: (name: string) => `Are you sure you want to delete "${name}"? This action cannot be undone.`,
    deleteTemplateTitle: 'Delete Template',
    templateDeletedSuccess: (name: string) => `Template "${name}" has been deleted successfully.`,
    templateCreatedSuccess: (name: string) => `Template "${name}" has been created successfully.`,
    templateUpdatedSuccess: (name: string) => `Template "${name}" has been updated successfully.`,
    
    // Generic confirmation messages
    confirmDelete: (item: string) => `Are you sure you want to delete this ${item}? This action cannot be undone.`,
    confirmAction: 'Are you sure you want to proceed with this action?',
    
    // Generic success messages
    deleteSuccess: (item: string) => `${item} deleted successfully.`,
    createSuccess: (item: string) => `${item} created successfully.`,
    updateSuccess: (item: string) => `${item} updated successfully.`,
    
    // Button text
    confirmButton: 'Confirm',
    cancelButton: 'Cancel',
    deleteButton: 'Delete',
    okButton: 'OK',
}