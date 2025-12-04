import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNav = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="buk-footer-main">
      <div className="buk-footer-container">
        {/* Brand Section */}
        <div className="buk-footer-brand" onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>
          <div className="buk-footer-logo-container">
            <img
              src="/images/buklogo.webp"
              alt="BUK Certificate Verification System Logo"
              className="buk-footer-logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="buk-footer-logo-placeholder" style={{ display: 'none' }}>
              <span className="buk-footer-initials">BUK</span>
            </div>
          </div>
          <div>
            <strong>Bayero University, Kano</strong>
            <div className="buk-footer-motto">TO LEAD IN RESEARCH AND EDUCATION IN AFRICA</div>
          </div>
        </div>

        {/* Links */}
        <div className="buk-footer-links">
          <NavLink to="/" onClick={scrollToTop}>Home</NavLink>
          <NavLink to="/about" onClick={scrollToTop}>About Us</NavLink>
          <NavLink to="/verifier/login" onClick={scrollToTop}>Verify Certificate</NavLink>
          <NavLink to="/contact" onClick={scrollToTop}>Contact Us</NavLink>
        </div>

        {/* Contact Info */}
        <div className="buk-footer-contact">
          <div>PMB 3011, Gwarzo Road Kano, Nigeria</div>
          <div>Phone: (+234) 816-0107510</div>
          <div>
            Email: <a href="mailto:info@buk.edu.ng">info@buk.edu.ng</a>
          </div>
          <div>
            Registry: <a href="mailto:registry@buk.edu.ng">registry@buk.edu.ng</a>
          </div>
        </div>

        {/* Verification Info */}
        <div className="buk-footer-verification">
          <div className="verification-info">
            <strong>Certificate Verification</strong>
            <div>Secure verification of BUK qualifications</div>
            <div>24/7 online access</div>
          </div>
        </div>

        {/* Affiliations */}
        <div className="buk-footer-affiliations">
          <span>TETFUND</span>
          <span>NUC</span>
          <span>Ministry of Education</span>
          <span>Certificate Verification</span>
        </div>
      </div>

      <div className="buk-footer-bottom">
        COPYRIGHT © {new Date().getFullYear()} BAYERO UNIVERSITY, KANO. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
