import React, { useState, useImperativeHandle, forwardRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

// const modalElement = document.createElement('div');
// modalElement.setAttribute('id', 'modal-root')

export function Modal({ children, defaultOpened = false }, ref) {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const modalElement = document.getElementById('modal-root');

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }), [close])

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return createPortal(
    isOpen ? <div onClick={() => setIsOpen(false)} className='modal'>{children}</div> : null,
    modalElement
  )

}

export default forwardRef(Modal)