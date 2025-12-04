import React from 'react';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import './DashboardLayout.css';

const DashboardLayout = ({ children, user }) => {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar role={user.role} />
      <div className="dashboard-main">
        <DashboardHeader user={user} />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
