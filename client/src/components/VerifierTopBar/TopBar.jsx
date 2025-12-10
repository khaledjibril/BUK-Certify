import React from "react";
import { Bell } from "lucide-react";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div>
        <h1>Verifier Control Center</h1>
        <p>BUK Digital Credential Verification System</p>
      </div>
      <div className={styles.userInfo}>
        <Bell className="text-slate-400" />
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
