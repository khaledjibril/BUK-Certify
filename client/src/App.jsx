import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage/LandingPage";
import About from "./pages/AboutPage/About";
import HelpDesk from "./pages/HelpDesk/HelpDesk";
import PendingApproval from "./pages/PendingApproval/PendingApproval";

import Verify from "./pages/Verify/Verify";
import VerifyLayout from "./layouts/VerifyLayout";

import VerifierLogin from "./pages/VerifierLogin/VerifierLogin";
import VerifierRegister from "./pages/VerifierRegister/VerifierRegister";
import VerifierLayout from "./layouts/VerifierLayout";

import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";

import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/help-desk" element={<HelpDesk />} />
          <Route path="/pending-approval" element={<PendingApproval />} />

          <Route path="/verifier-login" element={<VerifierLogin />} />
          <Route path="/verifier-register" element={<VerifierRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ================= VERIFY (PUBLIC TOOL) ================= */}
          <Route path="/verify" element={<VerifyLayout />}>
            <Route index element={<Verify />} />
          </Route>

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
                 </ProtectedRoute>
            }
          />

          {/* ================= VERIFIER DASHBOARD ================= */}
          <Route
            path="/verifier/dashboard/*"
            element={
              <ProtectedRoute role="verifier">
                <VerifierLayout />
              </ProtectedRoute>
            }
          />

          {/* ================= CATCH ALL ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
