import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange
}) => {
  if (totalPages <= 1 && totalItems <= itemsPerPage) {
    return null;
  }

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="admin-pagination-container">
      <div className="pagination-info">
        <span>
          Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{' '}
          <strong>{totalItems}</strong> entries
        </span>

        {onItemsPerPageChange && (
          <div className="per-page-selector">
            <label htmlFor="per-page-select">Per page:</label>
            <select
              id="per-page-select"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}
      </div>

      <div className="pagination-controls">
        <button
          className="pg-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          title="First Page"
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          className="pg-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="pg-numbers">
          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={`dots-${idx}`} className="pg-dots">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pg-num-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="pg-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>

        <button
          className="pg-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          title="Last Page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
