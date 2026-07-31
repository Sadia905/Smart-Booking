import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingCategories from './components/BookingCategories';
import FeaturedServices from './components/FeaturedServices';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import AdminLayout from './components/admin/layout/AdminLayout';
import './App.css';

function MainAppContent() {
  const { currentView } = useAdmin();

  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="app-container">
      {/* Background Decorative Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      {/* Public Components */}
      <Navbar />
      <Hero />
      <BookingCategories />
      <FeaturedServices />
      <Feedback />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <MainAppContent />
    </AdminProvider>
  );
}

export default App;
