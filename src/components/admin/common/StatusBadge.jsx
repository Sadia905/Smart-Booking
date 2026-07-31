import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status, type = 'booking' }) => {
  // Normalize string for CSS class matching
  const normalized = (status || '').toLowerCase().replace(/\s+/g, '-');
  
  return (
    <span className={`status-badge badge-${type} status-${normalized}`}>
      <span className="badge-dot"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
