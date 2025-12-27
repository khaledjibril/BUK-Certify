import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ScanLine,
  FileSearch,
  History,
  LogOut,
  Menu,
  X,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";

import NavIcon from "../NavIcon/NavIcon";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isMini, setIsMini }) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Responsive watcher
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const basePath = "/verifier/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("buk_verifier_token");
    navigate("/verifier/login");
  };

  const navItems = [
    { name: "Overview", path: `${basePath}/overview`, icon: <ShieldCheck /> },
    { name: "Request UVC", path: `${basePath}/request-uvc`, icon: <HelpCircle /> },
    { name: "Search", path: `${basePath}/search`, icon: <FileSearch /> },
    { name: "History", path: `${basePath}/history`, icon: <History /> }
  ];

  const isMobile = windowWidth <= 768;

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          className={styles.mobileToggle}
          aria-label="Toggle sidebar"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isMini ? styles.mini : ""} ${
          isMobileOpen ? styles.open : ""
        }`}
        aria-label="Verifier Sidebar"
      >
        {/* Logo + Mini Toggle */}
        <div className={styles.brandWrapper}>
          <div
            className={styles.brand}
            onClick={() => {
              navigate("/verifier/dashboard");
              setIsMobileOpen(false);
            }}
            role="button"
            tabIndex={0}
          >
            <img
              src="/images/buklogo.webp"
              alt="BUK Logo"
              className={styles.logo}
            />
            {!isMini && <div className={styles.title}>BUK Certify</div>}
          </div>

          {!isMobile && (
            <button
              className={styles.miniToggle}
              onClick={() => setIsMini(!isMini)}
              title={isMini ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label="Toggle mini sidebar"
            >
              <ChevronLeft
                size={20}
                className={`${styles.chevron} ${isMini ? styles.rotated : ""}`}
              />
            </button>
          )}
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
              aria-label={item.name}
            >
              <NavIcon icon={item.icon} label={item.name} isMini={isMini} />
              {!isMini && <span className={styles.label}>{item.name}</span>}
              {isMini && <span className={styles.tooltip}>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className={styles.bottom}>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            title={isMini ? "Logout" : ""}
            aria-label="Logout"
          >
            <LogOut size={18} />
            {!isMini && <span>Home</span>}
            {isMini && <span className={styles.tooltip}>Home</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
