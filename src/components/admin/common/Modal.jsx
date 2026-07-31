import React, { useEffect } from 'react';
import { X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  type = 'default', // 'default' | 'danger' | 'warning' | 'info'
  confirmText,
  onConfirm,
  confirmButtonClass = 'btn-primary',
  cancelText = 'Cancel',
  size = 'md' // 'sm' | 'md' | 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className={`admin-modal-container modal-size-${size} modal-type-${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div className="modal-title-wrapper">
            {type === 'danger' && <AlertTriangle className="modal-header-icon icon-danger" size={22} />}
            {type === 'warning' && <AlertTriangle className="modal-header-icon icon-warning" size={22} />}
            {type === 'info' && <Info className="modal-header-icon icon-info" size={22} />}
            <h3>{title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="admin-modal-body">{children}</div>

        {(onConfirm || cancelText) && (
          <div className="admin-modal-footer">
            {cancelText && (
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {cancelText}
              </button>
            )}
            {onConfirm && (
              <button
                type="button"
                className={`btn ${type === 'danger' ? 'btn-danger' : confirmButtonClass}`}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText || 'Confirm'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
