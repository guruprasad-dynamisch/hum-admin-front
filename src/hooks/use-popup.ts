import { useState, useCallback } from 'react';

interface UsePopupReturn {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  open: (event: React.MouseEvent<HTMLElement>) => void;
  close: () => void;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Custom hook for managing popup/popover state
 * Handles anchor element and open/close state for dropdowns, popovers, etc.
 * 
 * @example
 * const popup = usePopup();
 * <button onClick={popup.open}>Open Popup</button>
 * <Popover anchorEl={popup.anchorEl} open={popup.isOpen} onClose={popup.close}>...</Popover>
 */
export function usePopup(): UsePopupReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setAnchorEl(null);
  }, []);

  const toggle = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (isOpen) {
      close();
    } else {
      open(event);
    }
  }, [isOpen, open, close]);

  return {
    isOpen,
    anchorEl,
    open,
    close,
    toggle,
  };
}
