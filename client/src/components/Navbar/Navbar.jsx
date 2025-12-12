import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ adminLink }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const navigate = useNavigate();

  const handleBurgerClick = (e) => {
    e.stopPropagation(); 
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
const [darkMode, setDarkMode] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);

const profileRef = useRef(null);

// DEMO AUTH DATA (replace with real auth later)
const isAuthenticated = true;
const userRole = "admin"; // "admin" | "verifier" | "student"
const user = { name: "Khaled" };

const logout = () => {
  alert("Logged out");
};

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

  return (
  <nav className={`bukx-navbar ${darkMode ? 'dark' : ''}`}>
    
    {/* ================= BRAND ================= */}
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

    {/* ================= DESKTOP LINKS ================= */}
    <ul className={`bukx-links ${menuOpen ? 'open' : ''}`} ref={menuRef}>      
      
      {/* ===== MEGA MENU ===== */}
      <li className="mega">
        <span className="mega-title">Services ▾</span>
        <div className="mega-menu">
          <div>
            <h4>Verification</h4>
            <div><NavLink to="/verifier-login">Verifier Login</NavLink></div>
            <div><NavLink to="/verifier/dashboard">Verify Certificate</NavLink></div>
          </div>
          <div>
            <h4>University</h4>
            <div><NavLink to="/about">About System</NavLink></div>
            <div><NavLink to="/help-desk">Help Desk</NavLink></div>
          </div>
        </div>
      </li>

      <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
      <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>

      {/* ===== ROLE AWARE DASHBOARD ===== */}
      {userRole === 'admin' && (
        <li><NavLink to="/admin/dashboard">Admin Dashboard</NavLink></li>
      )}
      {userRole === 'verifier' && (
        <li><NavLink to="/verifier/dashboard">Verifier Dashboard</NavLink></li>
      )}

      {/* ===== USER PROFILE ===== */}
      {isAuthenticated && (
        <li className="profile" ref={profileRef}>
          <span onClick={() => setProfileOpen(!profileOpen)} className="profile-trigger">
            {user.name} ▾
          </span>

          {profileOpen && (
            <div className="profile-menu">
              <NavLink to="/profile">My Profile</NavLink>
              <NavLink to="/verifier/dashboard/settings">Settings</NavLink>
              <span onClick={logout}>Logout</span>
            </div>
          )}
        </li>
      )}

      {/* ===== DARK MODE TOGGLE ===== */}
      <li>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </li>
    </ul>

    {/* ================= MOBILE TOGGLE ================= */}
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
