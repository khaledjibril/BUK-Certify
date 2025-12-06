import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './VerifierLogin.css';

function VerifierLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    fullName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Handle login
        const response = await fetch('http://localhost:3000/verifier/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('verifier_token', data.token);
          setMessage('Login successful! Redirecting to verification dashboard...');
          // Redirect to verification dashboard
          setTimeout(() => {
            window.location.href = '/verify-dashboard';
          }, 1500);
        } else {
          setMessage(data.error || 'Login failed. Please check your credentials.');
        }
      } else {
        // Handle registration
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/verifier/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            organization: formData.organization,
            fullName: formData.fullName,
            phone: formData.phone
          })
        });

        const data = await response.json();
        if (response.ok) {
          setMessage('Registration successful! Please check your email for verification.');
          setIsLogin(true);
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            organization: '',
            fullName: '',
            phone: ''
          });
        } else {
          setMessage(data.error || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      setMessage('Network error. Please check your connection and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="verifier">
            <Navbar />

    <div className="verifier-login-page">
      <div className="verifier-login-container">
        <div className="verifier-login-header">
          <div className="verifier-logo-section">
            <div className="verifier-logo">
              <img
                src="/images/buklogo.webp"
                alt="BUK Certificate Verification System Logo"
                className="verifier-logo-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="verifier-logo-placeholder" style={{display: 'none'}}>
                <span className="verifier-initials">BUK</span>
              </div>
            </div>
          </div>
          <h1>BUK Certificate Verification</h1>
          <p>Access the official BUK certificate verification system</p>
        </div>

        <div className="verifier-login-card">
          <div className="verifier-tabs">
            <button 
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <span className="tab-icon"></span>
              Login
            </button>
            <button 
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <span className="tab-icon"></span>
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="verifier-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your organization name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <button type="submit" className="verifier-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <span className="btn-icon">{isLogin ? '' : ''}</span>
              )}
              {loading ? 'Processing...' : (isLogin ? 'Login to Verify' : 'Register as Verifier')}
            </button>
          </form>

          {/* <div className="verifier-info">
            <h3>Who can register as a verifier?</h3>
            <ul>
              <li>Employers and HR professionals</li>
              <li>Educational institutions</li>
              <li>Government agencies</li>
              <li>Professional licensing bodies</li>
              <li>Background check companies</li>
            </ul>
          </div> */}

          <div className="verifier-security">
            <h4> Secure Verification System</h4>
            <p>Your credentials are encrypted and protected. BUK maintains the highest standards of data security for certificate verification.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
        </div>

  );
}

export default VerifierLogin; 