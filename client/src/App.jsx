import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/AboutPage/About';

import Verify from './pages/Verify/Verify';
import VerifyLayout from './layouts/VerifyLayout';

import VerifierLogin from './pages/VerifierLogin/VerifierLogin';
import VerifierLayout from './layouts/VerifierLayout';

import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';

import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifier/login" element={<VerifierLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route path="/admin/dashboard/*" element={<AdminLayout />} />

          {/* ================= VERIFIER DASHBOARD ================= */}
          <Route path="/verifier/dashboard/*" element={<VerifierLayout />} />

          {/* ================= VERIFY ROUTES WITH LAYOUT ================= */}
          <Route path="/verify" element={<VerifyLayout />}>
            <Route index element={<Verify />} />
          </Route>

          {/* ================= CATCH ALL ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
