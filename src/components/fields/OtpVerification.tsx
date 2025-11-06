import React, { useState, useRef, useEffect } from 'react';
import { useForm, useController, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryBtn from '@components/buttons/PrimaryBtn';
import { otpSchema, OtpFormData } from '@validations/register-validations';
import '@styles/components/otp-verification.scss';

interface OtpVerificationProps {
  /** Mode of operation */
  mode?: 'standalone' | 'react-hook-form';
  /** Field name (required for react-hook-form mode) */
  name?: string;
  /** React Hook Form control (required for react-hook-form mode) */
  control?: Control<any>;
  /** Phone number where OTP was sent (standalone mode) */
  phoneNumber?: string;
  /** Callback when OTP is verified successfully (standalone mode) */
  onVerify?: (otp: string) => Promise<void>;
  /** Callback to go back to previous step */
  onBack?: () => void;
  /** Callback to resend OTP */
  onResend?: () => Promise<void>;
  /** Loading state */
  loading?: boolean;
  /** Number of OTP digits (default: 6) */
  length?: number;
  /** Resend cooldown in seconds (default: 60) */
  resendCooldown?: number;
  /** Show phone number display (default: true for standalone) */
  showPhoneNumber?: boolean;
  /** Show back button (default: true) */
  showBackButton?: boolean;
  /** Show resend section (default: true) */
  showResendSection?: boolean;
}

/**
 * Production-ready OTP Verification Component
 * 
 * Supports both standalone and react-hook-form modes
 * 
 * Features:
 * - Auto-focus and auto-advance between inputs
 * - Backspace navigation
 * - Paste support for full OTP
 * - Resend with cooldown timer
 * - Form validation with Zod
 * - Accessible keyboard navigation
 */
const OtpVerification: React.FC<OtpVerificationProps> = ({
  mode = 'standalone',
  name = 'otp',
  control,
  phoneNumber = '',
  onVerify,
  onBack,
  onResend,
  loading = false,
  length = 6,
  resendCooldown = 60,
  showPhoneNumber = true,
  showBackButton = true,
  showResendSection = true,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // React Hook Form integration
  const isReactHookForm = mode === 'react-hook-form' && control;
  let fieldProps: any = {};
  let fieldError: any = null;

  if (isReactHookForm) {
    const {
      field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value: fieldValue },
      fieldState: { error },
    } = useController({
      name: name!,
      control: control!,
    });

    fieldProps = {
      value: fieldValue || '',
      onChange: fieldOnChange,
      onBlur: fieldOnBlur,
    };
    fieldError = error;
  }

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Use field error from react-hook-form if available, otherwise use local errors
  const displayError = isReactHookForm ? fieldError : errors.code;

  // Start resend timer on mount
  useEffect(() => {
    setResendTimer(resendCooldown);
  }, [resendCooldown]);

  // Countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  /**
   * Handle OTP input change
   */
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Update react-hook-form value if in that mode
    if (isReactHookForm) {
      fieldProps.onChange(newOtpValues.join(''));
    }

    // Clear errors when user types
    clearErrors('code');
    if (isReactHookForm && fieldError) {
      // Clear field error - this might need adjustment based on your form setup
    }

    // Auto-advance to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle backspace key
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle paste event
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Only process if pasted data is all digits
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const digits = pastedData.slice(0, length).split('');
    const newOtpValues = [...otpValues];
    
    digits.forEach((digit, index) => {
      if (index < length) {
        newOtpValues[index] = digit;
      }
    });

    setOtpValues(newOtpValues);

    // Update react-hook-form value if in that mode
    if (isReactHookForm) {
      fieldProps.onChange(newOtpValues.join(''));
    }

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtpValues.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
  };

  /**
   * Handle OTP verification
   */
  const handleVerifyOtp = async () => {
    const otp = otpValues.join('');
    
    // Validate OTP
    const result = otpSchema.safeParse({ code: otp });
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      setError('code', { message: firstError?.message || 'Invalid OTP code' });
      return;
    }

    if (isReactHookForm) {
      // In react-hook-form mode, just update the value
      // The parent form will handle submission
      fieldProps.onChange(otp);
      return;
    }

    // Standalone mode - call onVerify callback
    if (!onVerify) {
      console.error('onVerify callback is required in standalone mode');
      return;
    }

    try {
      await onVerify(otp);
    } catch (error) {
      setError('code', { 
        message: error instanceof Error ? error.message : 'Invalid verification code. Please try again.' 
      });
    }
  };

  /**
   * Handle resend OTP
   */
  const handleResendOtp = async () => {
    if (!onResend || resendTimer > 0 || isResending) {
      return;
    }

    setIsResending(true);
    
    try {
      await onResend();
      setResendTimer(resendCooldown);
      setOtpValues(Array(length).fill(''));
      
      // Update react-hook-form value if in that mode
      if (isReactHookForm) {
        fieldProps.onChange('');
      }
      
      clearErrors('code');
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setError('code', { 
        message: error instanceof Error ? error.message : 'Failed to resend code. Please try again.' 
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-verification">
      <h1 className="card-title">Verify Phone Number</h1>
      {showPhoneNumber && phoneNumber && (
        <p className="card-subtitle">
          Enter the 6-digit code sent to <strong>{phoneNumber}</strong>
        </p>
      )}

      {/* OTP Inputs */}
      <div className="otp-inputs">
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={loading || isResending}
            className={`otp-input ${displayError ? 'error' : ''}`}
            autoFocus={index === 0}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="error-message">
          {displayError.message}
        </div>
      )}

      {/* Verify Button - Only show in standalone mode */}
      {!isReactHookForm && (
        <PrimaryBtn
          type="button"
          loading={loading}
          className="verify-btn"
          onClick={handleVerifyOtp}
          disabled={otpValues.join('').length !== length}
        >
          Verify & Complete Registration
        </PrimaryBtn>
      )}

      {/* Resend Section */}
      {showResendSection && onResend && (
        <div className="resend-section">
          {resendTimer > 0 ? (
            <p className="resend-timer">
              Resend code in <strong>{resendTimer}s</strong>
            </p>
          ) : (
            <p className="resend-link">
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className={isResending ? 'disabled' : ''}
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button>
            </p>
          )}
        </div>
      )}

      {/* Back Button - Only show in standalone mode */}
      {!isReactHookForm && showBackButton && onBack && (
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          disabled={loading || isResending}
        >
          Back to Registration
        </button>
      )}
    </div>
  );
};

export default OtpVerification;
