import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import StatusBadge from '../common/StatusBadge';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  DollarSign,
  User,
  AlertCircle
} from 'lucide-react';
import './BookingsManager.css';

const BookingsManager = () => {
  const { bookings, services, updateBookingStatus, deleteBooking, addToast } =
    useAdmin();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest' | 'price-high' | 'price-low'

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modals
  const [viewBooking, setViewBooking] = useState(null);
  const [pendingStatusChange, setPendingStatusChange] = useState(null); // { booking, targetStatus }
  const [deletingBooking, setDeletingBooking] = useState(null);

  // Filter & Sort Logic
  const filteredBookings = useMemo(() => {
    let result = bookings.filter((b) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        b.id.toLowerCase().includes(term) ||
        b.customerName.toLowerCase().includes(term) ||
        b.customerEmail.toLowerCase().includes(term) ||
        b.serviceName.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'All' || b.bookingStatus === statusFilter;

      const matchesService =
        serviceFilter === 'All' || b.serviceName === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortOrder === 'price-high') {
        return b.totalPrice - a.totalPrice;
      }
      if (sortOrder === 'price-low') {
        return a.totalPrice - b.totalPrice;
      }
      return 0;
    });

    return result;
  }, [bookings, searchTerm, statusFilter, serviceFilter, sortOrder]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const currentBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(start, start + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  const uniqueServiceNames = useMemo(() => {
    const names = new Set(services.map((s) => s.name));
    return ['All', ...Array.from(names)];
  }, [services]);

  // Status Change Confirmation Trigger
  const handleRequestStatusChange = (booking, newStatus) => {
    if (booking.bookingStatus === newStatus) return;
    setPendingStatusChange({ booking, targetStatus: newStatus });
  };

  const handleConfirmStatusChange = () => {
    if (pendingStatusChange) {
      updateBookingStatus(
        pendingStatusChange.booking.id,
        pendingStatusChange.targetStatus
      );
      setPendingStatusChange(null);
    }
  };

  return (
    <div className="bookings-manager-page">
      <div className="page-section-header">
        <div>
          <h2>Booking Management</h2>
          <p>Review customer reservations, approve requests, or process status updates</p>
        </div>
      </div>

      <div className="admin-card-container">
        {/* Filters and Search Bar */}
        <div className="table-filter-bar">
          <div className="search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by Booking ID, Customer Name, Email, or Service..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="filter-dropdowns">
            {/* Filter by Booking Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Booking Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Filter by Service */}
            <select
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setCurrentPage(1);
              }}
              style={{ maxWidth: '200px' }}
            >
              <option value="All">All Services</option>
              {uniqueServiceNames
                .filter((s) => s !== 'All')
                .map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        {currentBookings.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Bookings Found"
            description="There are no booking entries matching your filter criteria."
            actionText="Reset Filters"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setServiceFilter('All');
              setSortOrder('newest');
            }}
          />
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Booking Date</th>
                  <th>Seats</th>
                  <th>Total Price</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="font-mono font-bold text-indigo">{b.id}</td>
                    <td>
                      <div className="cust-cell">
                        <span className="cust-name">{b.customerName}</span>
                        <span className="cust-email">{b.customerEmail}</span>
                      </div>
                    </td>
                    <td className="truncate-cell">{b.serviceName}</td>
                    <td>
                      <div className="date-time-cell">
                        <span>{b.bookingDate}</span>
                        <span className="time-sub">{b.bookingTime || '14:00'}</span>
                      </div>
                    </td>
                    <td className="font-semibold">{b.seats}</td>
                    <td className="font-bold">${b.totalPrice}</td>
                    <td>
                      <StatusBadge status={b.paymentStatus} type="payment" />
                    </td>
                    <td>
                      <StatusBadge status={b.bookingStatus} type="booking" />
                    </td>
                    <td className="font-mono text-muted">{b.createdAt}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <button
                          className="action-btn-sm btn-view"
                          onClick={() => setViewBooking(b)}
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Confirm Action Button */}
                        {b.bookingStatus === 'Pending' && (
                          <button
                            className="action-btn-sm btn-confirm"
                            onClick={() => handleRequestStatusChange(b, 'Confirmed')}
                            title="Confirm Booking"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}

                        {/* Complete Action Button */}
                        {b.bookingStatus === 'Confirmed' && (
                          <button
                            className="action-btn-sm btn-complete"
                            onClick={() => handleRequestStatusChange(b, 'Completed')}
                            title="Mark Completed"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}

                        {/* Cancel Action Button */}
                        {b.bookingStatus !== 'Cancelled' &&
                          b.bookingStatus !== 'Completed' && (
                            <button
                              className="action-btn-sm btn-cancel"
                              onClick={() => handleRequestStatusChange(b, 'Cancelled')}
                              title="Cancel Booking"
                            >
                              <XCircle size={15} />
                            </button>
                          )}

                        {/* Delete Button */}
                        <button
                          className="action-btn-sm btn-delete"
                          onClick={() => setDeletingBooking(b)}
                          title="Delete Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredBookings.length}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* VIEW BOOKING DETAILS MODAL */}
      {viewBooking && (
        <Modal
          isOpen={!!viewBooking}
          onClose={() => setViewBooking(null)}
          title={`Booking Information #${viewBooking.id}`}
          size="md"
        >
          <div className="booking-modal-detail">
            <div className="detail-row">
              <span className="lbl">Booking Reference:</span>
              <span className="val font-mono font-bold text-indigo">{viewBooking.id}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Customer Name:</span>
              <span className="val">{viewBooking.customerName}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Customer Email:</span>
              <span className="val">{viewBooking.customerEmail}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Phone Number:</span>
              <span className="val">{viewBooking.customerPhone || '+1 (555) 000-0000'}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Reserved Experience:</span>
              <span className="val">{viewBooking.serviceName}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Reservation Date:</span>
              <span className="val">{viewBooking.bookingDate}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Number of Seats:</span>
              <span className="val">{viewBooking.seats} Seat(s)</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Total Price Charged:</span>
              <span className="val font-bold">${viewBooking.totalPrice}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Payment Status:</span>
              <span className="val">
                <StatusBadge status={viewBooking.paymentStatus} type="payment" />
              </span>
            </div>
            <div className="detail-row">
              <span className="lbl">Booking Status:</span>
              <span className="val">
                <StatusBadge status={viewBooking.bookingStatus} type="booking" />
              </span>
            </div>
            <div className="detail-row">
              <span className="lbl">Created Timestamp:</span>
              <span className="val font-mono">{viewBooking.createdAt}</span>
            </div>
          </div>
        </Modal>
      )}

      {/* CONFIRM STATUS CHANGE MODAL */}
      {pendingStatusChange && (
        <Modal
          isOpen={!!pendingStatusChange}
          onClose={() => setPendingStatusChange(null)}
          title="Confirm Status Update"
          type={pendingStatusChange.targetStatus === 'Cancelled' ? 'warning' : 'info'}
          confirmText={`Update to ${pendingStatusChange.targetStatus}`}
          onConfirm={handleConfirmStatusChange}
        >
          <p>
            Are you sure you want to change the status of booking{' '}
            <strong>#{pendingStatusChange.booking.id}</strong> ({pendingStatusChange.booking.customerName}) from{' '}
            <strong>{pendingStatusChange.booking.bookingStatus}</strong> to{' '}
            <strong>{pendingStatusChange.targetStatus}</strong>?
          </p>
        </Modal>
      )}

      {/* DELETE BOOKING MODAL */}
      {deletingBooking && (
        <Modal
          isOpen={!!deletingBooking}
          onClose={() => setDeletingBooking(null)}
          title="Delete Booking Record"
          type="danger"
          confirmText="Yes, Delete Booking"
          onConfirm={() => deleteBooking(deletingBooking.id)}
        >
          <p>
            Are you sure you want to permanently remove booking record{' '}
            <strong>#{deletingBooking.id}</strong> for {deletingBooking.customerName}?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default BookingsManager;
