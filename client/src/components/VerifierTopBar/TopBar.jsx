import React from "react";
import { Bell, Sun, Moon, Menu } from "lucide-react";
import styles from "./TopBar.module.css";

export default function TopBar({ isDark, setIsDark, isMini, setIsMobileOpen }) {
  return (
    <div
      className={styles.topBar}
      data-mini={isMini ? "true" : "false"}
    >
      {/* Left section */}
      <div className={styles.leftSection}>
        {/* Mobile menu toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1>Verifier Control Center</h1>
          <p>BUK Digital Credential Verification System</p>
        </div>
      </div>

      {/* Right section */}
      <div className={styles.userInfo}>
        <button
          onClick={() => setIsDark(!isDark)}
          className={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Bell className={styles.bell} />

        <div className={styles.userDetails}>
          <div className={styles.avatar}>V</div>
          {!isMini && (
            <div className={styles.text}>
              <span className={styles.role}>Authorized Verifier</span>
              <span className={styles.session}>Secure Session</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
