import { useState, useCallback } from 'react';

interface UseModalReturn {
  show: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Custom hook for managing modal state
 * Simple show/hide state management for modals
 * 
 * @example
 * const modal = useModal();
 * <button onClick={modal.open}>Open Modal</button>
 * <Modal show={modal.show} onHide={modal.close}>...</Modal>
 */
export function useModal(): UseModalReturn {
  const [show, setShow] = useState(false);

  const open = useCallback(() => {
    setShow(true);
  }, []);

  const close = useCallback(() => {
    setShow(false);
  }, []);

  const toggle = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return {
    show,
    open,
    close,
    toggle,
  };
}
