import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ setPage, adminLink }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBurgerClick = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="buk-navbar">
      <div className="buk-navbar-logo" onClick={() => { setPage('landing'); closeMenu(); }} style={{cursor:'pointer'}}>
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
          <div className="buk-logo-placeholder" style={{display: 'none'}}>
            <span className="buk-initials">BUK</span>
          </div>
        </div>
        <span>Bayero University Kano</span>
      </div>
      <button className={`burger${menuOpen ? ' open' : ''}`} onClick={handleBurgerClick} aria-label="Toggle menu">
        <span/>
        <span/>
        <span/>
      </button>
      <ul className={`buk-navbar-links${menuOpen ? ' show' : ''}`}>
        <li><span onClick={() => { setPage('landing'); closeMenu(); }}>Home</span></li>
        <li><span onClick={() => { setPage('about'); closeMenu(); }}>About</span></li>
        <li><span onClick={() => { setPage('verifier'); closeMenu(); }}>Verifier Login</span></li>
        {adminLink && <li><span onClick={() => { setPage('admin'); closeMenu(); }}>Admin</span></li>}
      </ul>
    </nav>
  );
}

export default Navbar; 