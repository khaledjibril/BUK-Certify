import React, { useState, useEffect, useRef } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('bukx-darkmode') === 'true';
  });

  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const navigate = useNavigate();

  const handleBurgerClick = (e) => {
    e.stopPropagation(); 
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => setMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Persist dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('bukx-darkmode', !prev);
      return !prev;
    });
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        burgerRef.current &&
        !menuRef.current.contains(event.target) &&
        !burgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // ================= GUEST SERVICES =================
  const guestServices = [
    { label: 'Verifier Login', to: '/verifier-login' },
    { label: 'Verify Certificate', to: '/verifier/dashboard' },
  ];

  return (
    <nav className={`bukx-navbar ${darkMode ? 'dark' : ''}`}>
      {/* BRAND */}
      <div
        className="bukx-brand"
        onClick={() => {
          navigate('/');
          scrollToTop();
          closeMenu();
        }}
      >
        <img src="/images/buklogo.webp" alt="BUK Logo" className="bukx-logo" />
        <span className="bukx-title">BUK Certify</span>
      </div>

      {/* LINKS */}
      <ul className={`bukx-links ${menuOpen ? 'open' : ''}`} ref={menuRef}>

        {/* Services Dropdown */}
        <li className="mega">
          <span className="mega-title">Services ▾</span>
          <div className="mega-menu">
            {guestServices.map((item, index) => (
              <NavLink 
                key={index} 
                to={item.to} 
                onClick={closeMenu}
                className={({ isActive }) => isActive ? 'active-link' : ''}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </li>

        {/* Guest Links */}
        <li>
          <NavLink 
            to="/" 
            onClick={closeMenu} 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            onClick={closeMenu} 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/help-desk" 
            onClick={closeMenu} 
            className={({ isActive }) => isActive ? 'active-link' : ''}
          >
            Help Desk
          </NavLink>
        </li>

        {/* DARK MODE TOGGLE */}
        <li>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </li>
      </ul>

      {/* MOBILE TOGGLE */}
      <button
        className={`bukx-toggle ${menuOpen ? 'active' : ''}`}
        onClick={handleBurgerClick}
        ref={burgerRef}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
