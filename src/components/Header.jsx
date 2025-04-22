import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/logo.png'; // <- replace with your actual logo path

export default function Header({darkMode, setDarkMode, unit, setUnit, onLogoClick}) {

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const toggleUnit = () =>{
    setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-section">
            <div className='logo-clickable' onClick={onLogoClick}>
                <img src={logo} alt="Logo" className="logo" />
            </div>
          <h1>Weather Wizard</h1>
        </div>
        <div className='toggle-buttons'>
            <button className='temp-toggle' onClick={toggleUnit}>
                {unit === 'metric' ? 'Metric °C' : 'Imperial °F'}
            </button>
            <button className={`theme-toggle ${darkMode ? 'dark' : 'light'}`} onClick={toggleTheme}>
                <span className="icon">
                    {darkMode ? '🌙' : '☀️'}
                </span>
            </button>
        </div>
      </div>
    </header>
  );
}
