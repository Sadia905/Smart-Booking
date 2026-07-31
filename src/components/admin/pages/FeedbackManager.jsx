import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import StatusBadge from '../common/StatusBadge';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import {
  Search,
  Star,
  Eye,
  EyeOff,
  Trash2,
  Filter,
  MessageSquareQuote,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import './FeedbackManager.css';

const FeedbackManager = () => {
  const { feedback, toggleFeedbackVisibility, deleteFeedback } = useAdmin();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [visibilityFilter, setVisibilityFilter] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Modals
  const [deletingFeedback, setDeletingFeedback] = useState(null);

  // Filtered Logic
  const filteredFeedback = useMemo(() => {
    return feedback.filter((fb) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        fb.customerName.toLowerCase().includes(term) ||
        fb.serviceName.toLowerCase().includes(term) ||
        fb.review.toLowerCase().includes(term);

      const matchesRating =
        ratingFilter === 'All' || fb.rating === Number(ratingFilter);

      const matchesVisibility =
        visibilityFilter === 'All' || fb.status === visibilityFilter;

      return matchesSearch && matchesRating && matchesVisibility;
    });
  }, [feedback, searchTerm, ratingFilter, visibilityFilter]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage) || 1;
  const currentFeedback = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFeedback.slice(start, start + itemsPerPage);
  }, [filteredFeedback, currentPage, itemsPerPage]);

  return (
    <div className="feedback-manager-page">
      <div className="page-section-header">
        <div>
          <h2>Customer Feedback & Reviews</h2>
          <p>Moderate customer reviews, control website visibility, and analyze satisfaction ratings</p>
        </div>
      </div>

      <div className="admin-card-container">
        {/* Filters bar */}
        <div className="table-filter-bar">
          <div className="search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search reviews by customer name, experience keywords, or service..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="filter-dropdowns">
            {/* Filter by Rating */}
            <select
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
              <option value="3">3 Stars Only</option>
              <option value="2">2 Stars Only</option>
              <option value="1">1 Star Only</option>
            </select>

            {/* Filter by Visibility */}
            <select
              value={visibilityFilter}
              onChange={(e) => {
                setVisibilityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Visibility Statuses</option>
              <option value="Displayed">Displayed</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>

        {/* Feedback Cards Grid */}
        {currentFeedback.length === 0 ? (
          <EmptyState
            icon={MessageSquareQuote}
            title="No Feedback Entries Found"
            description="No customer reviews matched your search or filter options."
            actionText="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setRatingFilter('All');
              setVisibilityFilter('All');
            }}
          />
        ) : (
          <div className="feedback-cards-grid">
            {currentFeedback.map((fb) => (
              <div key={fb.id} className="feedback-card-item">
                <div className="fb-card-header">
                  <div className="fb-user-info">
                    <img
                      src={fb.customerAvatar}
                      alt={fb.customerName}
                      className="fb-user-avatar"
                    />
                    <div>
                      <h4 className="fb-user-title">{fb.customerName}</h4>
                      <span className="fb-date-sub">{fb.date}</span>
                    </div>
                  </div>

                  <StatusBadge status={fb.status} type="feedback" />
                </div>

                <div className="fb-card-body">
                  <span className="fb-service-badge">{fb.serviceName}</span>

                  <div className="fb-rating-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < fb.rating ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                    <span className="rating-num">({fb.rating}.0)</span>
                  </div>

                  <p className="fb-review-quote">"{fb.review}"</p>
                </div>

                <div className="fb-card-footer">
                  <button
                    className={`fb-action-btn ${
                      fb.status === 'Displayed' ? 'btn-hide' : 'btn-display'
                    }`}
                    onClick={() => toggleFeedbackVisibility(fb.id)}
                  >
                    {fb.status === 'Displayed' ? (
                      <>
                        <EyeOff size={15} />
                        <span>Hide Review</span>
                      </>
                    ) : (
                      <>
                        <Eye size={15} />
                        <span>Display on Web</span>
                      </>
                    )}
                  </button>

                  <button
                    className="fb-action-btn btn-delete-fb"
                    onClick={() => setDeletingFeedback(fb)}
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredFeedback.length}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* CONFIRM DELETE MODAL */}
      {deletingFeedback && (
        <Modal
          isOpen={!!deletingFeedback}
          onClose={() => setDeletingFeedback(null)}
          title="Delete Customer Feedback"
          type="danger"
          confirmText="Yes, Delete Feedback"
          onConfirm={() => deleteFeedback(deletingFeedback.id)}
        >
          <p>
            Are you sure you want to delete feedback entry by{' '}
            <strong>"{deletingFeedback.customerName}"</strong> for service{' '}
            <em>{deletingFeedback.serviceName}</em>?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default FeedbackManager;
