import React from 'react';
import '../styles/app.css';

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <span>WattWise</span>
        </div>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;