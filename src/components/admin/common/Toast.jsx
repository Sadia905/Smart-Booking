import React from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import './Toast.css';

const Toast = () => {
  const { toasts, removeToast } = useAdmin();

  if (!toasts.length) return null;

  return (
    <div className="admin-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-type-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle2 size={20} />}
            {toast.type === 'warning' && <AlertTriangle size={20} />}
            {toast.type === 'error' && <AlertCircle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
          </div>

          <div className="toast-content">
            <p>{toast.message}</p>
          </div>

          <button
            className="toast-close-btn"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss toast"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
