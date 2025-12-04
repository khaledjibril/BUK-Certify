import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ adminLink }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const navigate = useNavigate();

  const handleBurgerClick = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !burgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="buk-navbar">
      {/* Logo (now links to home) */}
      <div
        className="buk-navbar-logo"
        onClick={() => {
          navigate('/');
          scrollToTop();
          closeMenu();
        }}
      >
        <div className="buk-logo-container">
          <img
            src="/images/buklogo.webp"
            alt="BUK Certificate Verification System Logo"
            className="buk-logo-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="buk-logo-placeholder" style={{ display: 'none' }}>
            <span className="buk-initials">BUK</span>
          </div>
        </div>
        <span className="buk-logo-text">BUK Certify</span>
      </div>

      {/* Burger Menu */}
      <button
        className={`burger${menuOpen ? ' open' : ''}`}s
        onClick={handleBurgerClick}
        aria-label="Toggle menu"
        ref={burgerRef}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Navigation Links */}
      <ul
        className={`buk-navbar-links${menuOpen ? ' show' : ''}`}
        ref={menuRef}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => {
              scrollToTop();
              closeMenu();
            }}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => {
              scrollToTop();
              closeMenu();
            }}
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/verifier/login"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => {
              scrollToTop();
              closeMenu();
            }}
          >
            Verifier
          </NavLink>
        </li>

        {adminLink && (
          <li>
            <NavLink
              to="/admin/login"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => {
                scrollToTop();
                closeMenu();
              }}
            >
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
