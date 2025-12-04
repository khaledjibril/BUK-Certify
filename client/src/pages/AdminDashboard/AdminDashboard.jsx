import React, { useState, useEffect, useCallback } from 'react';
import './AdminDashboard.css';

function AdminDashboard({ onLogout }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);

  const token = localStorage.getItem('buk_admin_token');

  // ✅ Move headers INSIDE the callback so they don’t re-trigger useCallback unnecessarily
  const fetchAdminInfo = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      };

      const res = await fetch('http://localhost:3000/admin/info', { headers });
      const data = await res.json();
      setAdminInfo(data);
      setError('');
    } catch {
      setError('Failed to fetch admin info');
    } finally {
      setLoading(false);
    }
  }, [token]); // ✅ Only depends on token

  useEffect(() => {
    fetchAdminInfo();
  }, [fetchAdminInfo]);

  if (!token)
    return (
      <div className="buk-card" style={{ margin: '48px auto', maxWidth: 400 }}>
        Not logged in.
      </div>
    );

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">BUK Admin</div>
        <nav>
          <ul>
            <li><button onClick={fetchAdminInfo}>Dashboard</button></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
        </header>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="buk-result error">{error}</div>
        ) : (
          <div className="admin-content">
            {adminInfo && (
              <div className="buk-card">
                <h3>{adminInfo.message}</h3>
                <p><strong>System:</strong> {adminInfo.system}</p>
                <p><strong>Version:</strong> {adminInfo.version}</p>
                <p>Welcome to the BUK Admin Dashboard. This system is currently in development.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
