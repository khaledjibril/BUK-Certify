import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DashboardSidebar.css';

const DashboardSidebar = ({ role }) => {
  const location = useLocation();

  const menuItems =
    role === 'admin'
      ? [
          { path: '/admin', label: 'Overview' },
          { path: '/admin/students', label: 'Students' },
          { path: '/admin/certificates', label: 'Certificates' },
          { path: '/admin/verifiers', label: 'Verifiers' },
          { path: '/admin/settings', label: 'Settings' },
        ]
      : [
          { path: '/verifier', label: 'Overview' },
          { path: '/verifier/verify', label: 'Verify Certificate' },
          { path: '/verifier/logs', label: 'Logs' },
        ];

  return (
    <div className="dashboard-sidebar">
      <h2 className="dashboard-logo">BUK Certify</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
