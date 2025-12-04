import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('buk_admin_token', data.token);
        onLogin();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <section className="buk-card" style={{margin:'48px auto',maxWidth:400}}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="buk-form">
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="buk-input"
          required
        />
        <button className="buk-btn" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {error && <div className="buk-result error">{error}</div>}
    </section>
  );
}

export default AdminLogin; 