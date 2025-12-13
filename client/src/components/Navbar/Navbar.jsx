import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon, User } from 'lucide-react';
import './Navbar.css';

const NavItem = ({ to, label, onClick }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => (isActive ? 'active-link' : '')}
    >
      {label}
    </NavLink>
  </li>
);

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('bukx-darkmode') === 'true'
  );

  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  /* ================= DEMO AUTH ================= */
  const isAuthenticated = false;
  const userRole = 'guest'; // guest | verifier | admin
  const user = { name: 'Khaled' };

  const isGuest = userRole === 'guest';
  const isAdmin = userRole === 'admin';
  const isVerifier = userRole === 'verifier';

  /* ================= HANDLERS ================= */
  const closeMenu = () => setMenuOpen(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('bukx-darkmode', !prev);
      return !prev;
    });
  };

  const logout = () => alert('Logged out');

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = e => {
      if (
        menuRef.current &&
        burgerRef.current &&
        !menuRef.current.contains(e.target) &&
        !burgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  /* ================= SERVICES CONFIG ================= */
  const servicesByRole = {
    admin: [
      { label: 'Admin Settings', to: '/admin/settings' },
      { label: 'Help Desk', to: '/help-desk' },
    ],
    verifier: [
      { label: 'Verify Certificate', to: '/verifier/dashboard' },
      { label: 'Help Desk', to: '/help-desk' },
    ],
    guest: [
      { label: 'Login', to: '/verifier-login' },
      { label: 'Register', to: '/verifier-register' },
      { label: 'Verify Certificate', to: '/verifier/dashboard' },
      { label: 'Help Desk', to: '/help-desk' },
    ],
  };

  return (
    <nav className={`bukx-navbar ${darkMode ? 'dark' : ''}`}>
      {/* BRAND */}
      <div
        className="bukx-brand"
        onClick={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          closeMenu();
        }}
      >
        <img src="/images/buklogo.webp" alt="BUK Logo" className="bukx-logo" />
        <span className="bukx-title">BUK Certify</span>
      </div>

      {/* LINKS */}
      <ul className={`bukx-links ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        {/* SERVICES */}
        <li className="mega">
          <span className="mega-title">Services ▾</span>
          <div className="mega-menu">
            {servicesByRole[userRole].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </li>

        <NavItem to="/" label="Home" onClick={closeMenu} />

        {/* ADMIN */}
        {isAdmin && (
          <NavItem
            to="/admin/dashboard"
            label="Admin Dashboard"
            onClick={closeMenu}
          />
        )}

        {/* GUEST ONLY */}
        {isGuest && (
          <>
            <NavItem to="/about" label="About" onClick={closeMenu} />
            <NavItem to="/help-desk" label="Help Desk" onClick={closeMenu} />
          </>
        )}

        {/* PROFILE */}
        {(isAdmin || isVerifier) && isAuthenticated && (
          <li className="profile" ref={profileRef}>
            <span
              className="profile-trigger"
              onClick={() => setProfileOpen(p => !p)}
            >
              <User size={16} /> {user.name} ▾
            </span>

            {profileOpen && (
              <div className="profile-menu">
                <NavLink to="/profile" onClick={closeMenu}>
                  My Profile
                </NavLink>
                <NavLink to="/settings" onClick={closeMenu}>
                  Settings
                </NavLink>
                <span onClick={logout}>Logout</span>
              </div>
            )}
          </li>
        )}

        {/* THEME */}
        <li>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </li>
      </ul>

      {/* MOBILE TOGGLE */}
      <button
        ref={burgerRef}
        className={`bukx-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(p => !p)}
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
