import React from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  LayoutDashboard,
  ConciergeBell,
  CalendarCheck,
  MessageSquareQuote,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setCurrentView,
    settings
  } = useAdmin();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: ConciergeBell },
    { id: 'bookings', label: 'All Bookings', icon: CalendarCheck },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareQuote },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${
          isMobileMenuOpen ? 'mobile-open' : ''
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand" onClick={() => handleNavClick('dashboard')}>
            <div className="brand-logo-glow">
              <Sparkles size={20} className="brand-logo-icon" />
            </div>
            {!isSidebarCollapsed && (
              <span className="brand-title">
                {settings.general.websiteName || 'SmartBooking'}
              </span>
            )}
          </div>

          <button
            className="sidebar-toggle-btn desktop-only"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <button
            className="sidebar-close-mobile mobile-only"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">
            {!isSidebarCollapsed ? 'MAIN MENU' : '•'}
          </div>

          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <Icon size={20} className="nav-icon" />
                    {!isSidebarCollapsed && <span className="nav-text">{item.label}</span>}
                    {isActive && <div className="active-indicator" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Link back to website */}
        <div className="sidebar-footer">
          <button
            className="view-website-btn"
            onClick={() => setCurrentView('website')}
            title={isSidebarCollapsed ? 'View Live Website' : undefined}
          >
            <ExternalLink size={18} />
            {!isSidebarCollapsed && <span>View Live Website</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
