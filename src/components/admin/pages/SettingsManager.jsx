import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  Globe,
  Palette,
  Calendar,
  BellRing,
  Moon,
  Save,
  RotateCcw,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  MapPin,
  Sliders,
  Sparkles
} from 'lucide-react';
import './SettingsManager.css';

const SettingsManager = () => {
  const { settings, updateSettings, resetAllData, themeMode, setThemeMode, addToast } =
    useAdmin();

  const [activeSection, setActiveSection] = useState('general');
  const [formState, setFormState] = useState({ ...settings });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      general: { ...prev.general, [name]: value }
    }));
  };

  const handleBrandingChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      branding: { ...prev.branding, [name]: value }
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      bookingSettings: {
        ...prev.bookingSettings,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [name]: checked
      }
    }));
  };

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
    setFormState((prev) => ({
      ...prev,
      theme: { mode }
    }));
  };

  const handleSubmitSettings = (e) => {
    e.preventDefault();
    updateSettings(formState);
  };

  const sections = [
    { id: 'general', label: 'General Info', icon: Globe },
    { id: 'branding', label: 'Branding & Colors', icon: Palette },
    { id: 'booking', label: 'Booking Rules', icon: Sliders },
    { id: 'notifications', label: 'Notifications', icon: BellRing },
    { id: 'theme', label: 'Theme & Display', icon: Moon }
  ];

  return (
    <div className="settings-manager-page">
      <div className="page-section-header">
        <div>
          <h2>Admin Settings & System Configuration</h2>
          <p>Customize portal branding, booking limits, notification preferences, and system themes</p>
        </div>
      </div>

      <div className="settings-split-layout">
        {/* Settings Sub-nav */}
        <div className="settings-sidebar-nav">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                className={`settings-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(sec.id)}
              >
                <Icon size={18} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Form Content */}
        <div className="admin-card-container settings-form-container">
          <form onSubmit={handleSubmitSettings}>
            {/* GENERAL SETTINGS */}
            {activeSection === 'general' && (
              <div className="settings-section">
                <div className="section-title-box">
                  <h3>General Website & Business Information</h3>
                  <p>Configure contact information displayed on admin vouchers and invoices</p>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Website Name</label>
                    <div className="input-icon-wrapper">
                      <Globe size={16} className="input-left-icon" />
                      <input
                        type="text"
                        name="websiteName"
                        value={formState.general.websiteName}
                        onChange={handleGeneralChange}
                        className="form-control with-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Admin Notification Email</label>
                    <div className="input-icon-wrapper">
                      <Mail size={16} className="input-left-icon" />
                      <input
                        type="email"
                        name="adminEmail"
                        value={formState.general.adminEmail}
                        onChange={handleGeneralChange}
                        className="form-control with-icon"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Contact Support Phone</label>
                    <div className="input-icon-wrapper">
                      <Phone size={16} className="input-left-icon" />
                      <input
                        type="text"
                        name="contactNumber"
                        value={formState.general.contactNumber}
                        onChange={handleGeneralChange}
                        className="form-control with-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Headquarters Address</label>
                    <div className="input-icon-wrapper">
                      <MapPin size={16} className="input-left-icon" />
                      <input
                        type="text"
                        name="businessAddress"
                        value={formState.general.businessAddress}
                        onChange={handleGeneralChange}
                        className="form-control with-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BRANDING SETTINGS */}
            {activeSection === 'branding' && (
              <div className="settings-section">
                <div className="section-title-box">
                  <h3>Branding & Theme Color Palette</h3>
                  <p>Update system logo assets and brand color tokens</p>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Logo URL</label>
                    <input
                      type="url"
                      name="logoUrl"
                      value={formState.branding.logoUrl}
                      onChange={handleBrandingChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Favicon URL</label>
                    <input
                      type="url"
                      name="faviconUrl"
                      value={formState.branding.faviconUrl}
                      onChange={handleBrandingChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Primary Brand Color</label>
                    <div className="color-picker-input">
                      <input
                        type="color"
                        name="primaryColor"
                        value={formState.branding.primaryColor}
                        onChange={handleBrandingChange}
                        className="color-swatch"
                      />
                      <input
                        type="text"
                        name="primaryColor"
                        value={formState.branding.primaryColor}
                        onChange={handleBrandingChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Secondary Brand Color</label>
                    <div className="color-picker-input">
                      <input
                        type="color"
                        name="secondaryColor"
                        value={formState.branding.secondaryColor}
                        onChange={handleBrandingChange}
                        className="color-swatch"
                      />
                      <input
                        type="text"
                        name="secondaryColor"
                        value={formState.branding.secondaryColor}
                        onChange={handleBrandingChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOOKING SETTINGS */}
            {activeSection === 'booking' && (
              <div className="settings-section">
                <div className="section-title-box">
                  <h3>Global Booking & Cancellation Rules</h3>
                  <p>Control seat quotas, instant confirmations, and cancellation windows</p>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Default Max Seat Limit Per Booking</label>
                    <input
                      type="number"
                      name="defaultSeatLimit"
                      value={formState.bookingSettings.defaultSeatLimit}
                      onChange={handleBookingChange}
                      className="form-control"
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cancellation Time Window Limit (Hours)</label>
                    <input
                      type="number"
                      name="cancellationTimeLimitHours"
                      value={formState.bookingSettings.cancellationTimeLimitHours}
                      onChange={handleBookingChange}
                      className="form-control"
                      min="1"
                    />
                  </div>
                </div>

                <div className="toggle-list">
                  <div className="toggle-row">
                    <div>
                      <span className="toggle-title">Instant Auto-Confirmation</span>
                      <span className="toggle-desc">Automatically confirm incoming bookings without requiring manual review</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="autoConfirmation"
                        checked={formState.bookingSettings.autoConfirmation}
                        onChange={handleBookingChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <span className="toggle-title">Allow Customer Cancellations</span>
                      <span className="toggle-desc">Enable customers to cancel bookings within the allowed time limit</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="allowCancellation"
                        checked={formState.bookingSettings.allowCancellation}
                        onChange={handleBookingChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* NOTIFICATION SETTINGS */}
            {activeSection === 'notifications' && (
              <div className="settings-section">
                <div className="section-title-box">
                  <h3>Admin Notification Preferences</h3>
                  <p>Choose which events send push notifications and email alerts</p>
                </div>

                <div className="toggle-list">
                  <div className="toggle-row">
                    <div>
                      <span className="toggle-title">Email Notifications</span>
                      <span className="toggle-desc">Receive email summaries for system updates and daily metrics</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formState.notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <span className="toggle-title">Real-Time Booking Alerts</span>
                      <span className="toggle-desc">Trigger instant notifications when a customer places a new reservation</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="bookingAlerts"
                        checked={formState.notificationSettings.bookingAlerts}
                        onChange={handleNotificationChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div>
                      <span className="toggle-title">New Feedback Alerts</span>
                      <span className="toggle-desc">Get notified whenever a customer submits a new service review</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="feedbackAlerts"
                        checked={formState.notificationSettings.feedbackAlerts}
                        onChange={handleNotificationChange}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* THEME SETTINGS */}
            {activeSection === 'theme' && (
              <div className="settings-section">
                <div className="section-title-box">
                  <h3>Theme & Visual Mode</h3>
                  <p>Choose your preferred interface appearance</p>
                </div>

                <div className="theme-options-grid">
                  <div
                    className={`theme-card ${themeMode === 'light' ? 'selected' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <div className="theme-preview-box light-preview">
                      <div className="p-bar"></div>
                      <div className="p-card"></div>
                    </div>
                    <span className="theme-name font-bold">Light Mode</span>
                  </div>

                  <div
                    className={`theme-card ${themeMode === 'dark' ? 'selected' : ''}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <div className="theme-preview-box dark-preview">
                      <div className="p-bar"></div>
                      <div className="p-card"></div>
                    </div>
                    <span className="theme-name font-bold">Dark Mode</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="form-actions" style={{ marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetAllData}
              >
                <RotateCcw size={16} style={{ marginRight: '6px' }} />
                Reset Demo Factory State
              </button>

              <button type="submit" className="btn btn-primary">
                <Save size={16} style={{ marginRight: '6px' }} />
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
