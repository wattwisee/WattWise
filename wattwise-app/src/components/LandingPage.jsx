import React from 'react';
import '../styles/app.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="landing-header">
        <div className="container">
          <div className="nav-container">
            <div className="logo">
              <i className="fas fa-bolt"></i>
              <span>WattWise</span>
            </div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <Link to="/login" className="btn btn-secondary">Sign In</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">
              <span>New: Budget Tracking Available</span>
            </div>
            <h1 className="hero-title">Master Your Energy Consumption</h1>
            <p className="hero-subtitle">
              Take control of your electricity bills with real-time tracking, 
              appliance-level breakdown, and smart cost predictions. 
              Stop guessing and start saving.
            </p>
            <div className="hero-buttons">
              <Link to="/dashboard" className="btn btn-primary btn-large">
                Start Monitoring Free
              </Link>
              <button className="btn btn-secondary btn-large">
                View Demo
              </button>
            </div>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-chart-line"></i>
                <span>Real-time Analytics</span>
              </div>
              <div className="feature">
                <i className="fas fa-crystal-ball"></i>
                <span>Cost Predictions</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            {/* Dashboard preview image */}
            <div className="dashboard-preview">
              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-title">Daily Usage</div>
                  <div className="preview-value">28.5 kWh</div>
                </div>
                <div className="preview-chart">
                  {/* Chart visualization */}
                  <div className="chart-bars">
                    {[25, 32, 28, 29, 31, 27, 26, 25, 24, 23].map((height, i) => (
                      <div key={i} className="chart-bar" style={{ height: `${height * 2}px` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Everything you need to optimize usage</h2>
          <p className="section-subtitle">
            WattWise provides granular insights into your electricity consumption 
            patterns, helping you make informed decisions.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-plug"></i>
              </div>
              <h3>Appliance Tracking</h3>
              <p>
                Monitor individual appliances to identify power-hungry devices 
                and optimize their usage schedules.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bell"></i>
              </div>
              <h3>Budget Alerts</h3>
              <p>
                Set monthly budgets and get notified before you exceed them 
                with our intelligent prediction system.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h3>Smart Reports</h3>
              <p>
                View daily and monthly breakdowns with intuitive charts that 
                make understanding your bill simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <i className="fas fa-bolt"></i>
                <span>WattWise</span>
              </div>
              <p>Empowering households to smarter energy consumption since 2024.</p>
            </div>
            
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#api">API</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2024 WattWise Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;