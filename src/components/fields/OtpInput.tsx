import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useController } from "react-hook-form";

interface OtpInputProps {
  /** Number of OTP digits (default: 6) */
  length?: number;
  /** Callback function called when OTP is complete */
  onComplete?: (otp: string) => void;
  /** Callback function called on every change */
  onChange?: (otp: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Custom styling for the container */
  containerStyle?: React.CSSProperties;
  /** Custom styling for individual input fields */
  inputStyle?: React.CSSProperties;
  /** Gap between input fields */
  gap?: number;
  /** React Hook Form mode */
  mode?: 'standalone' | 'react-hook-form';
  /** React Hook Form control */
  control?: any;
  /** React Hook Form name */
  name?: string;
  /** React Hook Form rules */
  rules?: any;
  /** Auto-focus first input on mount (default: true) */
  autoFocus?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
  containerStyle,
  inputStyle,
  gap = 2,
  mode = 'standalone',
  control,
  name,
  rules,
  autoFocus = true,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // React Hook Form integration
  const isReactHookForm = mode === 'react-hook-form' && control && name;
  let fieldProps: any = {};
  let error = null;

  if (isReactHookForm) {
    const {
      field: { onChange: fieldOnChange, onBlur: fieldOnBlur, value: fieldValue, ref: fieldRef },
      fieldState: { error: fieldError },
    } = useController({
      name,
      control,
      rules,
      defaultValue: '',
    });

    fieldProps = {
      ref: fieldRef,
      value: fieldValue || '',
      onChange: fieldOnChange,
      onBlur: fieldOnBlur,
    };
    error = fieldError;
  }

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // Handle clearing a digit (value is empty)
    if (!value) {
      newOtp[index] = "";
      setOtp(newOtp);

      // Update form state
      const otpString = newOtp.join("");
      if (isReactHookForm) {
        fieldProps.onChange(otpString);
      } else {
        onChange?.(otpString);
      }

      // If this was the last filled digit, check if we need to call onComplete
      if (newOtp.every(digit => digit === "")) {
        if (isReactHookForm) {
          fieldProps.onChange("");
        } else {
          onChange?.("");
        }
      }
      return;
    }

    // Set the value for current index
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current field is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Update form state with current OTP string
    const otpString = newOtp.join("");
    if (isReactHookForm) {
      fieldProps.onChange(otpString);
    } else {
      onChange?.(otpString);
    }

    // Call onComplete if all fields are filled
    if (newOtp.every(digit => digit !== "") && otpString.length === length) {
      if (isReactHookForm) {
        fieldProps.onChange(otpString);
      }
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (disabled) return;

    // Handle backspace - clear current field and move to previous
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        // If current field has a value, just clear it
        newOtp[index] = "";
        setOtp(newOtp);

        // Update form state
        const otpString = newOtp.join("");
        if (isReactHookForm) {
          fieldProps.onChange(otpString);
        } else {
          onChange?.(otpString);
        }
      } else if (index > 0) {
        // If current field is empty, clear previous field and focus it
        newOtp[index - 1] = "";
        setOtp(newOtp);

        // Update form state
        const otpString = newOtp.join("");
        if (isReactHookForm) {
          fieldProps.onChange(otpString);
        } else {
          onChange?.(otpString);
        }

        // Focus the previous field
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Handle Delete key - clear current field
    if (e.key === "Delete" && otp[index]) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Update form state
      const otpString = newOtp.join("");
      if (isReactHookForm) {
        fieldProps.onChange(otpString);
      } else {
        onChange?.(otpString);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (pastedData.length > 0) {
      const newOtp = Array(length).fill("");
      for (let i = 0; i < pastedData.length && i < length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);

      // Update form state with current OTP string
      const otpString = newOtp.join("");
      if (isReactHookForm) {
        fieldProps.onChange(otpString);
      } else {
        onChange?.(otpString);
      }

      // Call onComplete if all fields are filled
      if (otpString.length === length) {
        if (isReactHookForm) {
          fieldProps.onChange(otpString);
        }
        onComplete?.(otpString);
      }

      // Focus the next empty field or the last field
      const nextFocusIndex = Math.min(pastedData.length, length - 1);
      setTimeout(() => {
        inputRefs.current[nextFocusIndex]?.focus();
      }, 0);
    }
  };

  // Reset OTP when length changes
  useEffect(() => {
    setOtp(Array(length).fill(""));
  }, [length]);

  // Auto-focus first input on mount if enabled and not disabled
  useEffect(() => {
    if (autoFocus && !disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  return (
    <Box sx={{ width: '100%', maxWidth: '525px' }}>
      <Box
        display="flex"
        gap={gap}
        justifyContent="center"
        alignItems="center"
        style={containerStyle}
        onPaste={handlePaste}
        marginBottom={2}
      >
        {otp.map((digit, idx) => (
          <React.Fragment key={idx}>
            <TextField
              id={`otp-${idx}`}
              data-testid={`otp-input-${idx}`}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={disabled}
              inputRef={(el) => (inputRefs.current[idx] = el)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "24px",
                  color: "var(--primary-orange)",
                  ...inputStyle,
                },
              }}
              sx={{
                width: "68px",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  fontSize: "24px",
                  border: error ? '2px solid var(--error-red)' : '1px solid var(--border-default)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-input)',
                  outline: 'none',
                  color: 'var(--text-white)',
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: error ? 'var(--error-red)' : 'var(--border-default)',
                    borderRadius: '8px',
                  },
                  "&:hover fieldset": {
                    borderColor: error ? 'var(--error-red)' : 'var(--border-hover)',
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: error ? 'var(--error-red)' : 'var(--primary-orange)',
                    borderWidth: '2px',
                  },
                },
                "& .MuiInputBase-input:focus": {
                  outline: 'none',
                },
              }}
            />
            {/* Add dash after every 3rd input (except after the last group) */}
            {idx < length - 1 && (idx + 1) % 3 === 0 && (
              <Typography
                sx={{
                  color: 'var(--text-white)',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  mx: 1
                }}
              >
                -
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>
      {error && (
        <span className="error-text">{error.message}</span>
      )}
    </Box>
  );
};

export default OtpInput;
