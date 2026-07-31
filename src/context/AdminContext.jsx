import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_FEEDBACK,
  INITIAL_SETTINGS
} from '../data/adminData';

const AdminContext = createContext();

const STORAGE_KEYS = {
  SERVICES: 'sb_admin_services_v1',
  BOOKINGS: 'sb_admin_bookings_v1',
  FEEDBACK: 'sb_admin_feedback_v1',
  SETTINGS: 'sb_admin_settings_v1',
  THEME: 'sb_admin_theme_v1'
};

export const AdminProvider = ({ children }) => {
  // Services State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch (e) {
      return INITIAL_SERVICES;
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch (e) {
      return INITIAL_BOOKINGS;
    }
  });

  // Feedback State
  const [feedback, setFeedback] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
    } catch (e) {
      return INITIAL_FEEDBACK;
    }
  });

  // Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch (e) {
      return INITIAL_SETTINGS;
    }
  });

  // Theme State ('light' | 'dark')
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved || 'light';
    } catch (e) {
      return 'light';
    }
  });

  // Active View: 'website' | 'admin'
  const [currentView, setCurrentView] = useState('admin');

  // Active Admin Page: 'dashboard' | 'services' | 'bookings' | 'feedback' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sidebar Collapsed State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {}
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedback));
    } catch (e) {}
  }, [feedback]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, themeMode);
    } catch (e) {}

    if (themeMode === 'dark') {
      document.body.classList.add('admin-dark-mode');
    } else {
      document.body.classList.remove('admin-dark-mode');
    }
  }, [themeMode]);

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- CRUD ACTIONS FOR SERVICES ---
  const addService = (newServiceData) => {
    const newId = `SRV-${100 + services.length + 1}`;
    const newService = {
      ...newServiceData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setServices((prev) => [newService, ...prev]);
    addToast(`Service "${newService.name}" created successfully!`, 'success');
    return newService;
  };

  const updateService = (id, updatedFields) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    addToast(`Service updated successfully!`, 'success');
  };

  const deleteService = (id) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((item) => item.id !== id));
    addToast(`Service "${target?.name || id}" deleted.`, 'info');
  };

  // --- CRUD ACTIONS FOR BOOKINGS ---
  const addBooking = (bookingData) => {
    const newId = `BK-${9000 + bookings.length + 1}`;
    const newBooking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setBookings((prev) => [newBooking, ...prev]);
    addToast(`Booking #${newId} created!`, 'success');
  };

  const updateBookingStatus = (id, newBookingStatus) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bookingStatus: newBookingStatus } : item
      )
    );
    addToast(`Booking #${id} status changed to ${newBookingStatus}.`, 'success');
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
    addToast(`Booking #${id} removed.`, 'info');
  };

  // --- CRUD ACTIONS FOR FEEDBACK ---
  const toggleFeedbackVisibility = (id) => {
    setFeedback((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'Displayed' ? 'Hidden' : 'Displayed';
          addToast(`Feedback visibility changed to ${newStatus}.`, 'info');
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  const deleteFeedback = (id) => {
    setFeedback((prev) => prev.filter((item) => item.id !== id));
    addToast(`Feedback entry deleted.`, 'info');
  };

  // --- SETTINGS ACTIONS ---
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    addToast('Admin settings saved successfully!', 'success');
  };

  const resetAllData = () => {
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setFeedback(INITIAL_FEEDBACK);
    setSettings(INITIAL_SETTINGS);
    setThemeMode('light');
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    addToast('All demo data reset to default factory state!', 'warning');
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AdminContext.Provider
      value={{
        services,
        bookings,
        feedback,
        settings,
        themeMode,
        setThemeMode,
        toggleTheme,
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toasts,
        addToast,
        removeToast,
        addService,
        updateService,
        deleteService,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        toggleFeedbackVisibility,
        deleteFeedback,
        updateSettings,
        resetAllData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
