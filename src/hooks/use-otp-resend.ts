import { useState, useEffect, useCallback } from 'react';

interface UseOtpResendOptions {
  /** Initial countdown time in seconds (default: 30) */
  initialTime?: number;
  /** Callback function called when resend is triggered. Should return a promise that resolves on success. */
  onResend?: () => Promise<void>;
  /** Whether to start the timer automatically (default: true) */
  autoStart?: boolean;
}

interface UseOtpResendReturn {
  /** Current countdown time remaining in seconds */
  timeLeft: number;
  /** Whether the countdown is currently active */
  isActive: boolean;
  /** Whether resend is currently allowed (timer expired) */
  canResend: boolean;
  /** Function to manually start/restart the timer */
  startTimer: () => void;
  /** Function to manually reset the timer */
  resetTimer: () => void;
  /** Function to trigger resend (also restarts timer) */
  handleResend: () => void;
  /** Formatted time string for display (MM:SS format) */
  formattedTime: string;
}

export const useOtpResend = ({
  initialTime = 30,
  onResend,
  autoStart = true,
}: UseOtpResendOptions = {}): UseOtpResendReturn => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);

  // Calculate if resend is allowed (timer has expired)
  const canResend = timeLeft === 0;

  // Format time as MM:SS
  const formattedTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
    .toString()
    .padStart(2, '0')}`;

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  // Start/restart timer function
  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
  }, [initialTime]);

  // Reset timer function
  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
  }, [initialTime]);

  // Handle resend function
  const handleResend = useCallback(async () => {
    if (canResend && onResend) {
      try {
        // Call the onResend callback and wait for it to complete
        await onResend();
        
        // Only restart the timer if onResend was successful
        startTimer();
      } catch (error) {
        // If onResend fails, don't start the timer
        // Error handling is done in the onResend callback itself
      }
    }
  }, [canResend, onResend, startTimer]);

  // Auto-start timer on mount if autoStart is true
  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
  }, [autoStart, startTimer]);

  return {
    timeLeft,
    isActive,
    canResend,
    startTimer,
    resetTimer,
    handleResend,
    formattedTime,
  };
};
