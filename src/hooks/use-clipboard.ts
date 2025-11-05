import { useState, useEffect, useRef } from 'react';

interface UseClipboardOptions {
  successDuration?: number;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { successDuration = 2000 } = options;
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset copied state after duration
      timeoutRef.current = setTimeout(() => {
        setHasCopied(false);
        timeoutRef.current = null;
      }, successDuration);

      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      setHasCopied(false);
      return false;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    hasCopied,
    copyToClipboard
  };
}