import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { setCurrentView } = useAdmin();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => setCurrentView('website')}>
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#paint0_linear)"/>
              <path d="M2 17L12 22L22 17" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5"/>
                  <stop offset="1" stopColor="#0ea5e9"/>
                </linearGradient>
                <linearGradient id="paint1_linear" x1="2" y1="19.5" x2="22" y2="19.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5"/>
                  <stop offset="1" stopColor="#0ea5e9"/>
                </linearGradient>
                <linearGradient id="paint2_linear" x1="2" y1="14.5" x2="22" y2="14.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5"/>
                  <stop offset="1" stopColor="#0ea5e9"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">SmartBooking</span>
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>

        <div className="nav-actions">
          <button className="btn btn-primary" onClick={() => setCurrentView('admin')}>
            <ShieldCheck size={18} style={{ marginRight: '6px' }} />
            Admin Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
