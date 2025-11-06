import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryBtn from '@components/buttons/PrimaryBtn';
import { otpSchema, OtpFormData } from '@validations/register-validations';
import '@styles/components/otp-verification.scss';

interface OtpVerificationProps {
  /** Phone number where OTP was sent */
  phoneNumber: string;
  /** Callback when OTP is verified successfully */
  onVerify: (otp: string) => Promise<void>;
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
}

/**
 * Production-ready OTP Verification Component
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
  phoneNumber,
  onVerify,
  onBack,
  onResend,
  loading = false,
  length = 6,
  resendCooldown = 60,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

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
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    clearErrors('code');

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace: clear current or move to previous
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
      }
    }
    
    // Arrow keys navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle paste event
   */
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only process if it's all digits and matches length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, length).split('');
      const newOtpValues = [...otpValues];
      
      digits.forEach((digit, index) => {
        if (index < length) {
          newOtpValues[index] = digit;
        }
      });
      
      setOtpValues(newOtpValues);
      clearErrors('code');
      
      // Focus last filled input or next empty
      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
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
    if (!onResend || resendTimer > 0 || isResending) return;

    setIsResending(true);
    try {
      await onResend();
      setResendTimer(resendCooldown);
      setOtpValues(Array(length).fill(''));
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otpValues.every(val => val !== '');
  const canResend = resendTimer === 0 && !isResending;

  return (
    <div className="otp-verification">
      <h1 className="card-title">Verify Phone Number</h1>
      <p className="card-subtitle">
        Enter the {length}-digit code sent to <strong>{phoneNumber}</strong>
      </p>

      {/* OTP Inputs */}
      <div className="otp-inputs" onPaste={handlePaste}>
        {otpValues.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            className={`otp-input ${errors.code ? 'error' : ''}`}
            maxLength={1}
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={loading}
            autoFocus={index === 0}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>

      {/* Error Message */}
      {errors.code && (
        <div className="error-message" role="alert">
          {errors.code.message}
        </div>
      )}

      {/* Verify Button */}
      <PrimaryBtn
        type="button"
        loading={loading}
        className="verify-btn"
        onClick={handleVerifyOtp}
        disabled={!isOtpComplete || loading}
      >
        Verify & Complete Registration
      </PrimaryBtn>

      {/* Resend Link */}
      <div className="resend-section">
        {resendTimer > 0 ? (
          <p className="resend-timer">
            Resend code in <strong>{resendTimer}s</strong>
          </p>
        ) : (
          <p className="resend-link">
            Didn't receive code?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend}
              className={canResend ? 'active' : 'disabled'}
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </p>
        )}
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          disabled={loading}
        >
          ← Back to Registration
        </button>
      )}
    </div>
  );
};

export default OtpVerification;
