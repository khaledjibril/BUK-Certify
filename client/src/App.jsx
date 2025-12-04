import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/AboutPage/About';
import VerifierLogin from './pages/VerifierLogin/VerifierLogin';
import AdminLogin from './pages/AdminLogin/AdminLogin';

import DashboardLayout from './pages/DashboardLayout';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import VerifierDashboard from './components/Dashboard/VerifierDashboard';
import './App.css';

function App() {
  const isAdmin = !!localStorage.getItem('buk_admin_token');
  const isVerifier = !!localStorage.getItem('buk_verifier_token');

  return (
    <Router>
      <ScrollToTop />

      <div className="App">
        <Navbar />

        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifier/login" element={<VerifierLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* --- Protected Admin Dashboard --- */}
          <Route
            path="/admin/dashboard"
            element={
              isAdmin ? (
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />

          {/* --- Protected Verifier Dashboard --- */}
          <Route
            path="/verifier/dashboard"
            element={
              isVerifier ? (
                <DashboardLayout>
                  <VerifierDashboard />
                </DashboardLayout>
              ) : (
                <Navigate to="/verifier/login" />
              )
            }
          />

          {/* --- Catch-all Route --- */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
