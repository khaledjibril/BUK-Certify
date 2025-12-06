import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/AboutPage/About';
import VerifierLogin from './pages/VerifierLogin/VerifierLogin';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminLayout from './layouts/AdminLayout'
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifier/login" element={<VerifierLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* --- Admin Dashboard --- */}
          <Route
            path="/admin/dashboard/*"
            element={
                  <AdminLayout />
            }
          />
          {/* --- Catch-all Route --- */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
