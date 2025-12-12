Hey use this as a guide, the adminsidebar and configure the verifiersidebar, however i want the sidebar UI to remin the same, but what i want you to do is use the functonality of the adminsidebar like the chevron, only icon when on mini-toggle. This is the AdminSidebar(import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  QrCode, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft,
  Sun,
  Moon
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar({ isMini, setIsMini }) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('buk_admin_token');
    navigate('/admin/login');
  };

  const items = [
    { to: '/admin/dashboard/overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { to: '/admin/dashboard/users', label: 'User Approvals', icon: <Users size={20} /> },
    { to: '/admin/dashboard/certificates', label: 'Certificates', icon: <FileText size={20} /> },
    { to: '/admin/dashboard/qr', label: 'QR Manager', icon: <QrCode size={20} /> },
    { to: '/admin/dashboard/logs', label: 'Security Logs', icon: <ShieldCheck size={20} /> },
    { to: '/admin/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && <div className={styles.overlay} onClick={() => setIsMobileOpen(false)} />}

      <aside
        className={`${styles.sidebar} ${isMobileOpen ? styles.open : ''} ${isMini ? styles.mini : ''}`}
        aria-label="Admin sidebar"
      >
        {/* Brand + Mini toggle */}
        <div className={styles.brandWrapper}>
          <div
            className={styles.brand}
            onClick={() => { navigate('/admin/dashboard'); setIsMobileOpen(false); }}
          >
            <img src="/images/buklogo.webp" alt="BUK Admin Logo" className={styles.logo} />
            {!isMini && <div className={styles.title}>BUK Admin Console</div>}
          </div>
          <button
            className={styles.miniToggleInside}
            onClick={() => setIsMini(!isMini)}
            aria-label="Toggle mini sidebar"
            title={isMini ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft
              size={16}
              className={`${styles.chevron} ${isMini ? styles.rotated : ''}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {items.map(it => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsMobileOpen(false)}
              title={isMini ? it.label : ''}
            >
              <span className={styles.icon}>{it.icon}</span>
              {!isMini && <span className={styles.label}>{it.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <button
          className={styles.themeToggle}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!isMini && <span className={styles.label}>Dark Mode</span>}
        </button>

        {/* Footer logout */}
        <div className={styles.footerActions}>
          <button className={styles.logoutBtn} onClick={handleLogout} title={isMini ? 'Logout' : ''}>
            <LogOut size={20} className={styles.icon} />
            {!isMini && 'Logout'}
          </button>
        </div>
      </aside>
    </>
  );
}
), this is the Admin.module.css(.sidebar {
  width: 240px;
  min-height: 100vh;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease, left 0.3s ease;
  z-index: 40;
}

.brandWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 64px;
  flex-shrink: 0;
  border-bottom: 1px solid #e5e7eb;
}

.brand {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 8px;
}

.title {
  font-weight: 700;
  font-size: 16px;
  color: #111827;
}

.miniToggleInside {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Chevron rotation */
.chevron {
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}

.nav {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.navItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #4b5563;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.navItem:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.active {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.icon {
  display: flex;
  align-items: center;
}

.label {
  flex: 1;
}

.footerActions {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}

.logoutBtn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  width: 100%;
  border-radius: 8px;
  font-weight: 500;
  color: #dc2626;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logoutBtn:hover {
  background-color: #fee2e2;
}

.themeToggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  width: 100%;
  border-radius: 8px;
  font-weight: 500;
  color: #111827;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.themeToggle:hover {
  background-color: #f3f4f6;
}

/* Mobile behavior */
.mobileToggle {
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  z-index: 50;
  cursor: pointer;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 30;
}

@media (max-width: 768px) {
  .sidebar {
    left: -260px;
  }
  .sidebar.open {
    left: 0;
  }
  .mobileToggle {
    display: block;
  }
  .miniToggleInside {
    display: none;
  }
}

/* Mini sidebar */
.sidebar.mini {
  width: 80px;
}

.sidebar.mini .title,
.sidebar.mini .label {
  display: none;
}

.sidebar.mini .logo {
  margin: 0 auto;
}

.sidebar.mini .navItem {
  justify-content: center;
}

.sidebar.mini .footerActions,
.sidebar.mini .themeToggle {
  justify-content: center;
}

/* Dark mode */
body.dark-mode {
  background-color: #1f2937;
  color: #f9fafb;
}

body.dark-mode .sidebar {
  background-color: #111827;
  border-right: 1px solid #374151;
}

body.dark-mode .navItem {
  color: #d1d5db;
}

body.dark-mode .navItem:hover {
  background-color: #374151;
  color: #f9fafb;
}

body.dark-mode .active {
  background-color: #2563eb;
  color: #fff;
}

body.dark-mode .footerActions,
body.dark-mode .logoutBtn,
body.dark-mode .themeToggle {
  color: #f87171;
}

body.dark-mode .logoutBtn:hover {
  background-color: #991b1b;
}
)

Now this is what you should work on : the VerifierSidebar(import React from "react";
import { NavLink } from "react-router-dom";
import { ShieldCheck, ScanLine, FileSearch, History, LogOut } from "lucide-react";
import NavIcon from "../NavIcon/NavIcon";
import styles from "./Sidebar.module.css";
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isMini, setIsMini }) {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('buk_verifier_token');
    navigate('/verifier/login');
  };

  const basePath = "/verifier/dashboard";

  const navItems = [
    { name: "Overview", path: `${basePath}/overview`, icon: <ShieldCheck /> },
    { name: "Scan", path: `${basePath}/scan`, icon: <ScanLine /> },
    { name: "Search", path: `${basePath}/search`, icon: <FileSearch /> },
    { name: "History", path: `${basePath}/history`, icon: <History /> },
  ];

  return (
    <aside className={styles.sidebar} data-mini={isMini ? "true" : "false"}>
      {/* Logo */}
      <div className={styles.logo}>BUK Certify</div>

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
          <button className={styles.logoutButton} onClick={handleLogout} title={isMini ? 'Logout' : ''}>
        
          <LogOut size={18} />
          {!isMini && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}) the VerifierSidebar.module.css(/* =============================
   SIDEBAR — FIXED NAVIGATION
   ============================= */

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;

  /* Your requested width */
  width: 7rem;

  background-color: #0f172a; /* slate-900 / 950 */
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.5rem 0;
  gap: 2rem;

  z-index: 100;
  transition: width 0.3s ease;
}

/* Mini Mode */
.sidebar[data-mini="true"] {
  width: 4rem; /* collapsed */
}

/* =============================
   LOGO
   ============================= */
.logo {
  font-size: 1.125rem;
  font-weight: bold;
  color: #818cf8; /* indigo-400 */
  text-align: center;
  margin-bottom: 1rem;
}

/* Hide logo text in mini mode */
.sidebar[data-mini="true"] .logo {
  font-size: 0; /* visually disappears without layout jump */
}

/* =============================
   NAVIGATION AREA
   ============================= */
.nav {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
  margin-top: 1rem;
}

.navItem,
.navItemActive {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  width: 100%;
  padding: 0.8rem 1rem;

  text-decoration: none;
  color: #cbd5e1; /* slate-300 */

  border-radius: 0.5rem;
  transition: background 0.2s ease, color 0.2s ease;
}

/* Regular hover state */
.navItem:hover {
  background-color: #1e293b; /* slate-800 */
  color: #818cf8; /* indigo-400 */
}

/* Active state */
.navItemActive {
  background-color: #6366f1; /* indigo-500 */
  color: white;
}

/* Hide labels in mini sidebar */
.sidebar[data-mini="true"] .navItem span,
.sidebar[data-mini="true"] .navItemActive span {
  display: none;
}

/* Ensure icons stay centered in mini */
.sidebar[data-mini="true"] .navItem,
.sidebar[data-mini="true"] .navItemActive {
  justify-content: center;
}

/* =============================
   LOGOUT BUTTON
   ============================= */
.bottom {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}

.logoutButton {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  width: 90%;
  padding: 0.75rem 1rem;

  border: none;
  background: none;
  color: #cbd5e1;

  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.logoutButton:hover {
  background-color: #1e293b;
  color: #f8fafc;
}

/* Hide logout text in mini mode */
.sidebar[data-mini="true"] .logoutButton span {
  display: none;
}
)
