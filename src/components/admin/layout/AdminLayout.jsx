import React from 'react';
import { useAdmin } from '../../../context/AdminContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from '../common/Toast';
import DashboardOverview from '../pages/DashboardOverview';
import ServicesManager from '../pages/ServicesManager';
import BookingsManager from '../pages/BookingsManager';
import FeedbackManager from '../pages/FeedbackManager';
import SettingsManager from '../pages/SettingsManager';
import './AdminLayout.css';

const AdminLayout = () => {
  const { activeTab, isSidebarCollapsed } = useAdmin();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'services':
        return <ServicesManager />;
      case 'bookings':
        return <BookingsManager />;
      case 'feedback':
        return <FeedbackManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={`admin-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar />
      <div className="admin-main-wrapper">
        <Topbar />
        <main className="admin-content-area">
          {renderActivePage()}
        </main>
      </div>
      <Toast />
    </div>
  );
};

export default AdminLayout;
