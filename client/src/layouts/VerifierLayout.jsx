import React, { useEffect, useState } from "react";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/VerifierSidebar/Sidebar";
import TopBar from "../components/VerifierTopBar/TopBar";
import Overview from "../pages/Verifier/Overview";
import Scan from "../pages/Verifier/Scan";
import Search from "../pages/Verifier/Search";
import HistoryPage from "../pages/Verifier/History";
import styles from "./VerifierLayout.module.css";

export default function VerifyLayout() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("verify-theme") === "dark";
  });
  const [isMini, setIsMini] = useState(false);

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
      {/* Sidebar with mini toggle */}
      <Sidebar isMini={isMini} setIsMini={setIsMini} />

      {/* Main content */}
      <div className={styles.mainContent} data-mini={isMini ? "true" : "false"}>
        <TopBar isDark={isDark} setIsDark={setIsDark} />

        <div className={styles.contentArea}>
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="scan" element={<Scan />} />
            <Route path="search" element={<Search />} />
            <Route path="history" element={<HistoryPage />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
