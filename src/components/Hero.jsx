import React from 'react';

const Hero = () => {
  return (
    <main className="hero-section" id="home">
      <div className="hero-container">

        <div className="hero-content">


          <h1 className="hero-title animate-fade-in-up delay-1">
            Scheduling made <br />
            <span className="text-gradient">Effortless & Smart</span>
          </h1>

          <p className="hero-subtitle animate-fade-in-up delay-2">
            The ultimate platform to manage your appointments, automate reminders,
            and grow your business without the manual overhead. Experience the
            future of booking today.
          </p>

          <div className="hero-cta animate-fade-in-up delay-3">
            <button className="btn btn-primary large">
              Sell all services
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hero-stats animate-fade-in-up delay-4">
            <div className="stat-item">
              <h3 className="stat-value">10k+</h3>
              <p className="stat-label">Active Users</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3 className="stat-value">99.9%</h3>
              <p className="stat-label">Uptime SLA</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stars">
                ★★★★★
              </div>
              <p className="stat-label">4.9/5 Rating</p>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-float">
          <div className="glass-card main-dashboard">
            <div className="card-header">
              <div className="window-controls">
                <span></span><span></span><span></span>
              </div>
              <div className="header-title">Dashboard</div>
            </div>
            <div className="card-body">
              <div className="metrics-row">
                <div className="metric-box pulse">
                  <div className="metric-icon blue"></div>
                  <div className="metric-details">
                    <div className="line title"></div>
                    <div className="line value"></div>
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-icon purple"></div>
                  <div className="metric-details">
                    <div className="line title"></div>
                    <div className="line value"></div>
                  </div>
                </div>
              </div>

              <div className="upcoming-section">
                <div className="section-header">
                  <div className="line title-long"></div>
                  <div className="btn-small"></div>
                </div>
                <div className="appointment-list">
                  {[1, 2, 3].map((item) => (
                    <div className="appointment-item" key={item}>
                      <div className="avatar"></div>
                      <div className="appointment-info">
                        <div className="line name"></div>
                        <div className="line time"></div>
                      </div>
                      <div className="status-badge"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="glass-card floating-card notifications parallax-1">
            <div className="icon-wrap green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <div className="notif-text">
              <strong>Booking Confirmed</strong>
              <span>Rose at 2:00 PM</span>
            </div>
          </div>

          <div className="glass-card floating-card revenue parallax-2">
            <div className="rev-header">Weekly Revenue</div>
            <div className="chart-bars">
              <div className="bar b1"></div>
              <div className="bar b2"></div>
              <div className="bar b3"></div>
              <div className="bar b4"></div>
              <div className="bar b5"></div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Hero;
