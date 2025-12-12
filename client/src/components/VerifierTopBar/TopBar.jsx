import React from "react";
import { Bell, Sun, Moon } from "lucide-react";
import styles from "./TopBar.module.css";

export default function TopBar({ isDark, setIsDark, isMini }) {
  return (
    <div 
      className={styles.topBar} 
      data-mini={isMini ? "true" : "false"}
    >
      <div>
        <h1>Verifier Control Center</h1>
        <p>BUK Digital Credential Verification System</p>
      </div>

      <div className={styles.userInfo}>
        <button
          onClick={() => setIsDark(!isDark)}
          className={styles.themeToggle}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Bell className={styles.bell} />

        <div className={styles.userDetails}>
          <div className={styles.avatar}>V</div>
          <div className={styles.text}>
            <span className={styles.role}>Authorized Verifier</span>
            <span className={styles.session}>Secure Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
