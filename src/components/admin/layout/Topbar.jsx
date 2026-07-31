import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  PlusCircle,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import './Topbar.css';

const Topbar = () => {
  const {
    activeTab,
    setActiveTab,
    setIsMobileMenuOpen,
    themeMode,
    toggleTheme,
    bookings,
    resetAllData,
    setCurrentView
  } = useAdmin();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const pendingCount = bookings.filter((b) => b.bookingStatus === 'Pending').length;
  const recentPendingBookings = bookings.filter((b) => b.bookingStatus === 'Pending').slice(0, 4);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'services':
        return 'Services Management';
      case 'bookings':
        return 'All Bookings';
      case 'feedback':
        return 'Customer Feedback';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'Admin Portal';
    }
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button
          className="topbar-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <div className="topbar-breadcrumb">
          <span className="breadcrumb-category">Admin</span>
          <span className="breadcrumb-separator">/</span>
          <h1 className="breadcrumb-page-title">{getBreadcrumbTitle()}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* Reset Demo Data Button */}
        <button
          className="topbar-icon-btn reset-btn"
          onClick={resetAllData}
          title="Reset Demo Data"
        >
          <RotateCcw size={16} />
          <span className="btn-label-desktop">Reset Demo</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="topbar-icon-btn theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {themeMode === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="topbar-dropdown-wrapper">
          <button
            className={`topbar-icon-btn notif-btn ${isNotifMenuOpen ? 'active' : ''}`}
            onClick={() => {
              setIsNotifMenuOpen(!isNotifMenuOpen);
              setIsProfileMenuOpen(false);
            }}
            title="Notifications"
          >
            <Bell size={19} />
            {pendingCount > 0 && <span className="notif-badge">{pendingCount}</span>}
          </button>

          {isNotifMenuOpen && (
            <div className="dropdown-menu notif-dropdown">
              <div className="dropdown-header">
                <h4>Pending Action Items</h4>
                <span className="badge-pill">{pendingCount} Pending</span>
              </div>
              <div className="dropdown-body">
                {recentPendingBookings.length === 0 ? (
                  <p className="empty-notif-msg">No pending bookings requiring approval.</p>
                ) : (
                  recentPendingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="notif-item"
                      onClick={() => {
                        setActiveTab('bookings');
                        setIsNotifMenuOpen(false);
                      }}
                    >
                      <div className="notif-dot"></div>
                      <div className="notif-info">
                        <p className="notif-title">
                          New booking request <strong>#{b.id}</strong>
                        </p>
                        <p className="notif-sub">
                          {b.customerName} • {b.serviceName}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="dropdown-footer">
                <button
                  onClick={() => {
                    setActiveTab('bookings');
                    setIsNotifMenuOpen(false);
                  }}
                >
                  View All Bookings &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="topbar-dropdown-wrapper">
          <div
            className="topbar-user-profile"
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsNotifMenuOpen(false);
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Admin Avatar"
              className="user-avatar"
            />
            <div className="user-details-desktop">
              <span className="user-name">Sarah Jenkins</span>
              <span className="user-role">Super Admin</span>
            </div>
            <ChevronDown size={14} className="user-chevron" />
          </div>

          {isProfileMenuOpen && (
            <div className="dropdown-menu profile-dropdown">
              <div className="profile-info-header">
                <p className="p-name">Sarah Jenkins</p>
                <p className="p-email">sarah.admin@smartbooking.io</p>
              </div>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                onClick={() => {
                  setActiveTab('settings');
                  setIsProfileMenuOpen(false);
                }}
              >
                <ShieldCheck size={16} />
                <span>Account Settings</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  setCurrentView('website');
                  setIsProfileMenuOpen(false);
                }}
              >
                <LogOut size={16} />
                <span>Exit to Website</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
