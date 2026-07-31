import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon bg-primary"></div>
              <span className="logo-text">SmartBook</span>
            </div>
            <p className="brand-desc">
              The ultimate platform to discover, book, and experience seamlessly. We bring all your favorite services into one unified, smart ecosystem.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>Sylhet, bangladesh</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>01700000000</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>support@smartbook.com</span>
              </li>
            </ul>
            
            <div className="newsletter">
              <p>Subscribe to our newsletter</p>
              <div className="newsletter-input">
                <input type="email" placeholder="Email address" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SmartBook. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#">English (US)</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
