// src/components/VerifierTopbar/VerifierTopbarB.jsx
import React from "react";
import styles from "./VerifierTopbar.module.css";
import { Bell, Sun, Moon } from "lucide-react";

export default function VerifierTopbarB({ toggleDarkMode, sidebarCollapsed, toggleSidebar }) {
  const verifierName = localStorage.getItem("buk_verifier_name") || "Verifier";

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button onClick={toggleSidebar} className={styles.sidebarToggle}>
          ☰
        </button>
        Welcome back, <strong>{verifierName}</strong>
      </div>
      <div className={styles.right}>
        <input className={styles.search} placeholder="Search certificate by UVC..." />
        <button onClick={toggleDarkMode} className={styles.themeToggle}>
          <Sun size={20} className="light-mode" />
          <Moon size={20} className="dark-mode" />
        </button>
        <Bell size={24} className="text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}
