import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ScanLine,
  FileSearch,
  History,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";

import NavIcon from "../NavIcon/NavIcon";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isMini, setIsMini }) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const basePath = "/verifier/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("buk_verifier_token");
    navigate("/verifier/login");
  };

  const navItems = [
    { name: "Overview", path: `${basePath}/overview`, icon: <ShieldCheck /> },
    { name: "Scan", path: `${basePath}/scan`, icon: <ScanLine /> },
    { name: "Search", path: `${basePath}/search`, icon: <FileSearch /> },
    { name: "History", path: `${basePath}/history`, icon: <History /> }
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileOpen(false)} />
      )}

      <aside
        className={`${styles.sidebar} ${isMini ? styles.mini : ""} ${
          isMobileOpen ? styles.open : ""
        }`}
      >
        {/* Logo + Mini Toggle */}
        <div className={styles.brandWrapper}>
        <div
            className={styles.brand}
            onClick={() => { navigate('/verifier/dashboard'); setIsMobileOpen(false); }}
          >
            <img src="/images/buklogo.webp" alt="BUK Admin Logo" className={styles.logo} />
            {!isMini && <div className={styles.title}>BUK Certify</div>}
          </div>          
          <button
            className={styles.miniToggle}
            onClick={() => setIsMini(!isMini)}
            title={isMini ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronLeft
              size={20}
              className={`${styles.chevron} ${isMini ? styles.rotated : ""}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                isActive ? styles.navItemActive : styles.navItem
              }
              title={isMini ? item.name : ""}
            >
              <NavIcon icon={item.icon} label={item.name} isMini={isMini} />
              {!isMini && <span className={styles.label}>{item.name}</span>}            
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className={styles.bottom}>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            title={isMini ? "Logout" : ""}
          >
            <LogOut size={18} />
            {!isMini && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
