import React from 'react';
import { SearchX, Inbox, RefreshCw } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No Records Found',
  description = 'There are no items matching your current criteria or filters.',
  actionText,
  onAction
}) => {
  return (
    <div className="admin-empty-state">
      <div className="empty-state-icon">
        <Icon size={42} />
      </div>
      <h4 className="empty-state-title">{title}</h4>
      <p className="empty-state-desc">{description}</p>
      {actionText && onAction && (
        <button type="button" className="btn btn-secondary empty-state-btn" onClick={onAction}>
          <RefreshCw size={15} style={{ marginRight: '6px' }} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
