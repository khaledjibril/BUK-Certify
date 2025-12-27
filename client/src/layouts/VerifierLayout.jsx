import React, { useEffect, useState } from "react";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/VerifierSidebar/Sidebar";
import TopBar from "../components/VerifierTopBar/TopBar";

import Overview from "../pages/Verifier/Overview";
import RequestUVC from "../pages/Verifier/RequestUVC";
import Search from "../pages/Verifier/Search";
import HistoryPage from "../pages/Verifier/History";

import styles from "./VerifierLayout.module.css";

export default function VerifierLayout() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("verify-theme") === "dark";
  });

  const [isMini, setIsMini] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("verify-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("verify-theme", "light");
    }
  }, [isDark]);

  return (
    <div className={styles.layoutRoot}>
      {/* Sidebar */}
      <Sidebar
        isMini={isMini}
        setIsMini={setIsMini}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content */}
      <div
        className={styles.mainContent}
        data-mini={isMini ? "true" : "false"}
      >
        {/* Topbar */}
        <TopBar
          isDark={isDark}
          setIsDark={setIsDark}
          isMini={isMini}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Scrollable content */}
        <div className={styles.contentWrapper}>
          <div className={styles.pageContent}>
            <Routes>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="Request UVC" element={<RequestUVC />} />
              <Route path="search" element={<Search />} />
              <Route path="history" element={<HistoryPage />} />
            </Routes>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
