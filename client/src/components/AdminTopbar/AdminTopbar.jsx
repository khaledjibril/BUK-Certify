import React, { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import styles from "./AdminTopbar.module.css";

export default function AdminTopbar() {
  const adminName = "Admin";
  const [notifications, setNotifications] = useState(3); // example notification count

  return (
    <header className={styles.topbar}>
      {/* Left: Welcome */}
      <div className={styles.left}>
        Welcome back, <strong>{adminName}</strong>
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className={styles.right}>
        {/* Search */}
        <div className={styles.searchWrap}>
          <Search size={16} color="#8b8b8b" />
          <input
            className={styles.search}
            placeholder="Search users, certificates..."
          />
        </div>

        {/* Notifications */}
        <div className={styles.notification}>
          <Bell size={20} />
          {notifications > 0 && (
            <span className={styles.badge}>{notifications}</span>
          )}
        </div>

        {/* Profile */}
        <div className={styles.profile}>
          <img
            src="/images/buklogo.webp"
            alt="Admin Avatar"
            className={styles.avatar}
          />
          <span>{adminName}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
