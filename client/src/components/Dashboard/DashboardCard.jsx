import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value }) => (
  <div className="dashboard-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default DashboardCard;
