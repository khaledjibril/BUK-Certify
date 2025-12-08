import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/AboutPage/About';
import VerifierLogin from './pages/VerifierLogin/VerifierLogin';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminLayout from './layouts/AdminLayout'
import VerifierLayout from './layouts/VerifierLayout'
import './App.css';
import VerifierDashboard from './components/Dashboard/VerifierDashboard';
import Dashboard from "./pages/Verifier/Dashboard";
// import VerifyCertificate from "./pages/Verifier/VerifyCertificate";
// import History from "./pages/Verifier/History";
// import QRScan from "./pages/Verifier/QRscan";
// import Notifications from "./pages/Verifier/Notifications";
// import Settings from "./pages/Verifier/Settings";

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
                    <Route
            path="/verifier/dashboard"
            element={
                <Dashboard />
            }
          />
                {/* Verifier Dashboard with nested routes */}
        {/* <Route
          path="/verifier/dashboard/*"
          element={
            <VerifierLayout>
              <Routes>
                <Route path="overview" element={<Dashboard />} />
                <Route path="verify" element={<VerifyCertificate />} />
                <Route path="history" element={<History />} />
                <Route path="qr" element={<QRScan />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Routes>
            </VerifierLayout>
          }
        /> */}

          {/* --- Catch-all Route --- */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
