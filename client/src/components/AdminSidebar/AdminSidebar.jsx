import React, { useState, useEffect } from 'react';
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
