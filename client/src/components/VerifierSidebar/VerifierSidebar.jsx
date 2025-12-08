// src/components/VerifierSidebar/VerifierSidebarB.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShieldCheck, FileText, QrCode, History, Bell, Settings, Menu } from "lucide-react";
import styles from "./VerifierSidebar.module.css";

export default function VerifierSidebarB({ collapsed, toggleCollapse, darkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("buk_verifier_token");
    navigate("/verifier/login");
  };

  const items = [
    { to: "/verifier/dashboard/overview", label: "Overview", icon: ShieldCheck },
    { to: "/verifier/dashboard/verify", label: "Verify Certificate", icon: FileText },
    { to: "/verifier/dashboard/history", label: "History", icon: History },
    { to: "/verifier/dashboard/qr", label: "QR Scan", icon: QrCode },
    { to: "/verifier/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/verifier/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${darkMode ? styles.dark : ""}`}
    >
      <div className={styles.topControls}>
        <div className={styles.brand} onClick={() => navigate("/")}>
          <div className={styles.logo}></div>
          {!collapsed && <div className={styles.title}>BUK Verifier</div>}
        </div>
        <Menu size={20} className={styles.menuIcon} onClick={toggleCollapse} />
      </div>

      <nav className={styles.nav}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <item.icon className="w-5 h-5 mr-2" />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footerActions}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
