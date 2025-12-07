import React, { useState } from 'react';
import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar/AdminTopbar';
import Overview from '../pages/Admin/Overview';
import UserApprovals from '../pages/Admin/UserApprovals';
import Certificates from '../pages/Admin/Certificates';
import QRManager from '../pages/Admin/QRManager';
import SecurityLogs from '../pages/Admin/SecurityLogs';
import Settings from '../pages/Admin/Settings';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const [isMini, setIsMini] = useState(false);

  return (
    <div className={styles.adminRoot}>
      {/* Sidebar with mini state */}
      <AdminSidebar isMini={isMini} setIsMini={setIsMini} />

      {/* Main content area */}
      <div className={styles.mainArea} data-mini={isMini ? 'true' : 'false'}>
        <AdminTopbar />

        <div className={styles.contentArea}>
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<UserApprovals />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="qr" element={<QRManager />} />
            <Route path="logs" element={<SecurityLogs />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
