import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import StatusBadge from '../common/StatusBadge';
import Modal from '../common/Modal';
import {
  ConciergeBell,
  CalendarCheck,
  Clock,
  MessageSquareQuote,
  ArrowRight,
  Eye
} from 'lucide-react';
import './DashboardOverview.css';

const DashboardOverview = () => {
  const { services, bookings, feedback, setActiveTab } = useAdmin();
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Core Statistics (Only 4 Cards)
  const totalServices = services.length;
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.bookingStatus === 'Pending').length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'Confirmed').length;
  const totalFeedback = feedback.length;

  const statsCards = [
    {
      title: 'Total Services',
      value: totalServices,
      icon: ConciergeBell,
      color: 'indigo',
      targetTab: 'services'
    },
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: CalendarCheck,
      color: 'sky',
      targetTab: 'bookings'
    },
    {
      title: 'Pending Bookings',
      value: pendingBookings,
      icon: Clock,
      color: 'amber',
      targetTab: 'bookings'
    },
    {
      title: 'Total Feedback',
      value: totalFeedback,
      icon: MessageSquareQuote,
      color: 'purple',
      targetTab: 'feedback'
    }
  ];

  const recentBookings = bookings.slice(0, 4);

  return (
    <div className="dashboard-overview-page">
      {/* Stat Cards Row (Only 4 Cards) */}
      <div className="stats-cards-grid">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`stat-card card-theme-${card.color}`}
              onClick={() => setActiveTab(card.targetTab)}
            >
              <div className="stat-card-header">
                <span className="stat-title">{card.title}</span>
                <div className="stat-icon-wrapper">
                  <Icon size={18} />
                </div>
              </div>
              <div className="stat-value">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Compact Status Chart & Recent Activity Grid */}
      <div className="overview-split-grid">
        {/* Compact Recent Bookings Section */}
        <div className="overview-card-box recent-bookings-box">
          <div className="box-header">
            <div>
              <h3>Recent Bookings</h3>
              <p className="box-subtitle">Latest customer reservation activity</p>
            </div>
            <button
              className="view-all-link-btn"
              onClick={() => setActiveTab('bookings')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="cust-cell">
                        <span className="cust-name">{b.customerName}</span>
                        <span className="cust-email">{b.customerEmail}</span>
                      </div>
                    </td>
                    <td className="truncate-cell">{b.serviceName}</td>
                    <td>{b.bookingDate}</td>
                    <td>
                      <StatusBadge status={b.bookingStatus} type="booking" />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="action-icon-btn"
                        onClick={() => setSelectedBooking(b)}
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compact Single Overview Chart */}
        <div className="overview-card-box compact-chart-box">
          <div className="box-header">
            <div>
              <h3>Booking Overview</h3>
              <p className="box-subtitle">Status breakdown summary</p>
            </div>
          </div>

          <div className="mini-chart-content">
            <div className="mini-progress-list">
              <div className="mini-bar-row">
                <div className="bar-info font-semibold">
                  <span>Confirmed</span>
                  <span>{confirmedBookings}</span>
                </div>
                <div className="progress-bg">
                  <div
                    className="progress-fill fill-confirmed"
                    style={{
                      width: `${(confirmedBookings / (totalBookings || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div className="mini-bar-row">
                <div className="bar-info font-semibold">
                  <span>Pending</span>
                  <span>{pendingBookings}</span>
                </div>
                <div className="progress-bg">
                  <div
                    className="progress-fill fill-pending"
                    style={{
                      width: `${(pendingBookings / (totalBookings || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="chart-legend-box">
              <div className="chart-legend-item">
                <span className="dot dot-confirmed"></span>
                <span>Confirmed ({confirmedBookings})</span>
              </div>
              <div className="chart-legend-item">
                <span className="dot dot-pending"></span>
                <span>Pending ({pendingBookings})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Quick View Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking Details #${selectedBooking.id}`}
          size="md"
        >
          <div className="booking-modal-detail">
            <div className="detail-row">
              <span className="lbl">Customer Name:</span>
              <span className="val">{selectedBooking.customerName}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Customer Email:</span>
              <span className="val">{selectedBooking.customerEmail}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Service:</span>
              <span className="val">{selectedBooking.serviceName}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Date & Time:</span>
              <span className="val">
                {selectedBooking.bookingDate} at {selectedBooking.bookingTime || '14:00'}
              </span>
            </div>
            <div className="detail-row">
              <span className="lbl">Seats Reserved:</span>
              <span className="val">{selectedBooking.seats} Seat(s)</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Total Price:</span>
              <span className="val font-bold">${selectedBooking.totalPrice}</span>
            </div>
            <div className="detail-row">
              <span className="lbl">Status:</span>
              <span className="val">
                <StatusBadge status={selectedBooking.bookingStatus} type="booking" />
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardOverview;
