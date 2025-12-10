import React, { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard/StatCard';
import {
  Users,
  CheckCircle,
  FileText,
  QrCode,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function Overview() {
  const [dateRange, setDateRange] = useState('7d');
  const [darkMode, setDarkMode] = useState(false);

  const [recentActivities, setRecentActivities] = useState([
    { type: 'user', desc: 'New user registration — Amina Yusuf', time: '2 mins ago' },
    { type: 'user', desc: 'New user registration — Joshua Daniel', time: '5 mins ago' },
    { type: 'cert', desc: 'Certificate verified — Matric: 18/ENG/345', time: '10 mins ago' },
    { type: 'qr', desc: 'QR Scan — IP: 196.6.12.11', time: '1 hour ago' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        type: ['user', 'cert', 'qr'][Math.floor(Math.random() * 3)],
        desc: `Simulated activity — ${Math.floor(Math.random() * 100)}`,
        time: 'Just now'
      };
      setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: 'Total Users', value: 1248, icon: <Users size={24} />, trend: 12, sparkline: [1100,1120,1150,1180,1200,1220,1248] },
    { title: 'Pending Approvals', value: 36, icon: <CheckCircle size={24} />, trend: -5, sparkline: [50,48,45,42,40,38,36] },
    { title: 'Approved Requests', value: 236, icon: <CheckCircle size={24} />, trend: 8, sparkline: [200,210,220,225,230,235,236] },
    { title: 'Rejected Requests', value: 406, icon: <CheckCircle size={24} />, trend: -9, sparkline: [400,405,410,402,408,406,406] },
    { title: 'Certificates Issued', value: 892, icon: <FileText size={24} />, trend: 8, sparkline: [800,820,840,860,870,880,892] },
    { title: 'QR Scans Today', value: 214, icon: <QrCode size={24} />, trend: 20, sparkline: [180,190,200,205,210,212,214] }
  ];

  const chartData = {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [
      { label: 'Users', data: [1100,1120,1150,1180,1200,1220,1248], borderColor: '#4f46e5', tension: 0.3 },
      { label: 'Certificates', data: [800,820,840,860,870,880,892], borderColor: '#10b981', tension: 0.3 },
      { label: 'QR Scans', data: [180,190,200,205,210,212,214], borderColor: '#f59e0b', tension: 0.3 }
    ]
  };

  const approvalPieData = {
    labels: ['Approved','Rejected','Pending'],
    datasets: [
      {
        data: [236,406,36],
        backgroundColor: ['#10b981','#ef4444','#f59e0b']
      }
    ]
  };

  const systemAlerts = [
    { msg: 'Server CPU load high', level: 'critical' },
    { msg: 'Pending certificates approaching 50', level: 'warning' },
    { msg: 'User registrations spike detected', level: 'info' }
  ];

  return (
    <div style={{ padding: 20, minHeight: '100vh', background: darkMode ? '#1f2937' : '#f5f5f5', color: darkMode ? '#f5f5f5' : '#111827' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28 }}>BUK Certify Overview</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <option value="1d">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
        {stats.map(s => (
          <StatCard key={s.title} title={s.title} value={<CountUp end={s.value} />} icon={s.icon}>
            <div style={{ color: s.trend >= 0 ? 'green' : 'red' }}>
              {s.trend >= 0 ? <ArrowUp size={14}/> : <ArrowDown size={14}/>} {s.trend}%
            </div>
            <Line
              data={{ labels: s.sparkline.map((_, i) => i), datasets: [{ data: s.sparkline, borderColor: '#4f46e5' }] }}
              options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
            />
          </StatCard>
        ))}
      </div>

      {/* WEEKLY CHART */}
      <div style={{ marginTop: 30 }}>
        <h3>Weekly Trends</h3>
        <Line data={chartData} />
      </div>

      {/* PIE + ALERTS */}
      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        <div style={{ width: 300 }}>
          <h3>Approval Breakdown</h3>
          <Pie data={approvalPieData} />
        </div>

        <div>
          <h3>System Alerts</h3>
          {systemAlerts.map((a, i) => (
            <div key={i}><AlertCircle size={16}/> {a.msg}</div>
          ))}
        </div>
      </div>

      {/* ACTIVITY */}
      <div style={{ marginTop: 30 }}>
        <h3>Recent Activity</h3>
        {recentActivities.map((a, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }}>
            {a.desc} — {a.time}
          </motion.div>
        ))}
      </div>

    </div>
  );
}
