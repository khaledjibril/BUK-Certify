// File: src/components/AdminSidebar/AdminSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens and redirect to admin login
    localStorage.removeItem('buk_admin_token');
    navigate('/admin/login');
  };

  const items = [
    { to: '/admin/dashboard/overview', label: 'Overview' },
    { to: '/admin/dashboard/users', label: 'User Approvals' },
    { to: '/admin/dashboard/certificates', label: 'Certificates' },
    { to: '/admin/dashboard/qr', label: 'QR Manager' },
    { to: '/admin/dashboard/logs', label: 'Security Logs' },
    { to: '/admin/dashboard/settings', label: 'Settings' },
  ];

  return (
    <aside className={styles.sidebar} aria-label="Admin sidebar">
      <div className={styles.brand} onClick={() => navigate('/admin/dashboard')}>
        <div className={styles.logo} />
        <div className={styles.title}>BUK Admin Console</div>
      </div>

      <nav className={styles.nav}>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            {it.label}
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
