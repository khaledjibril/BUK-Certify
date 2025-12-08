// src/layouts/VerifierLayoutB.jsx
import React, { useState, useEffect } from "react";
import VerifierSidebarB from "../components/VerifierSidebar/VerifierSidebar";
import VerifierTopbarB from "../components/VerifierTopbar/VerifierTopbar";
import styles from "./VerifierLayout.module.css";

export default function VerifierLayoutB({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className={`${styles.root} ${darkMode ? styles.dark : ""}`}>
      <VerifierSidebarB
        collapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        darkMode={darkMode}
      />
      <div className={styles.mainArea}>
        <VerifierTopbarB
          toggleDarkMode={() => setDarkMode(!darkMode)}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className={styles.contentArea}>{children}</main>
      </div>
    </div>
  );
}
