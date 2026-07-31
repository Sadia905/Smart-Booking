import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'table', count = 5 }) => {
  if (type === 'cards') {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="skeleton-card animate-pulse">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-value"></div>
            <div className="skeleton-line skeleton-sub"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'form') {
    return (
      <div className="skeleton-form animate-pulse">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-grid-2">
          <div className="skeleton-line skeleton-input"></div>
          <div className="skeleton-line skeleton-input"></div>
        </div>
        <div className="skeleton-line skeleton-textarea"></div>
      </div>
    );
  }

  return (
    <div className="skeleton-table animate-pulse">
      <div className="skeleton-table-header"></div>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="skeleton-table-row">
          <div className="skeleton-circle"></div>
          <div className="skeleton-line skeleton-flex-1"></div>
          <div className="skeleton-line skeleton-flex-2"></div>
          <div className="skeleton-line skeleton-pill"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
