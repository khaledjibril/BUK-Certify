import React from "react";
import { NavLink } from "react-router-dom";
import { ShieldCheck, ScanLine, FileSearch, History, LogOut } from "lucide-react";
import NavIcon from "../NavIcon/NavIcon";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isMini, setIsMini }) {
  const basePath = "/verifier/dashboard"; // base path for all routes

  const navItems = [
    { name: "Overview", path: `${basePath}/overview`, icon: <ShieldCheck /> },
    { name: "Scan", path: `${basePath}/scan`, icon: <ScanLine /> },
    { name: "Search", path: `${basePath}/search`, icon: <FileSearch /> },
    { name: "History", path: `${basePath}/history`, icon: <History /> },
  ];

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar} data-mini={isMini ? "true" : "false"}>
        {/* Logo */}
        <div className={styles.logo}>BUK</div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.navItemActive : styles.navItem
              }
            >
              <NavIcon icon={item.icon} label={item.name} isMini={isMini} />
            </NavLink>
          ))}
        </nav>

        {/* Bottom Logout */}
        <div className={styles.bottom}>
          <button
            onClick={() => alert("Logging out...")}
            className={styles.logoutButton}
          >
            <LogOut />
            {!isMini && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </div>
  );
}
