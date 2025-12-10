import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Camera, Bell, User, ShieldCheck, CheckCircle, XCircle, Clock, Activity, Archive, Search, Download } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styles from './Verify.module.css';
import { mockVerifyAPI } from '../../utils/mockAPI';

const throughput = [
  { d: 'Jan', v: 300 },
  { d: 'Feb', v: 420 },
  { d: 'Mar', v: 560 },
  { d: 'Apr', v: 700 },
  { d: 'May', v: 780 },
  { d: 'Jun', v: 910 },
];

export default function VerifyDashboardB() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([
      { id: 'BUK-2025-00121', status: 'VALID', time: '2025-12-08 10:24' },
      { id: 'BUK-2025-00302', status: 'INVALID', time: '2025-12-08 09:12' },
      { id: 'BUK-2025-00111', status: 'VALID', time: '2025-12-07 18:02' },
    ]);
  }, []);

  const handleVerify = async () => {
    setLoading(true);
    const r = await mockVerifyAPI(id.trim());
    setLoading(false);
    if (r.ok) {
      setRes({ ok: true, ...r });
      setHistory(h => [{ id: r.id, status: 'VALID', time: new Date().toISOString() }, ...h].slice(0,10));
    } else {
      setRes({ ok: false, reason: r.reason });
      setHistory(h => [{ id: id || 'UNKNOWN', status: 'INVALID', time: new Date().toISOString() }, ...h].slice(0,10));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* LEFT PANEL */}
        <div className={styles.leftPanel}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.iconCircle}><ShieldCheck /></div>
                <div>
                  <div className={styles.titleSmall}>BUK CERTIFY</div>
                  <div className={styles.titleLarge}>Verify Control — B</div>
                </div>
              </div>
              <Bell />
            </div>
            <div className={styles.inputGroup}>
              <input value={id} onChange={e=>setId(e.target.value)} placeholder="BUK-2025-00121" className={styles.inputField}/>
              <button className={styles.buttonPrimary} onClick={handleVerify}>{loading?'Verifying…':'Verify'}</button>
            </div>
            <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem'}}>
              <button className={styles.buttonSecondary}><QrCode /> Scan QR</button>
              <button className={styles.buttonSecondary}><Camera /> Live Camera</button>
            </div>
            <div className={styles.verifyInfo}>
              <div className={styles.verifyCircle}><User /></div>
              <div>
                <div>Authorized Verify</div>
                <div style={{ fontSize:'0.625rem', color:'#94a3b8' }}>2FA • NDPR • Encrypted</div>
              </div>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div style={{display:'flex',justifyContent:'space-between',fontWeight:600}}>
              <span>Verification Throughput</span>
              <span style={{fontSize:'0.75rem',color:'#94a3b8'}}>6 Months</span>
            </div>
            <div style={{height:'12rem',marginTop:'0.75rem'}}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughput}>
                  <defs>
                    <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.08}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="d"/>
                  <YAxis/>
                  <Tooltip/>
                  <Area type="monotone" dataKey="v" stroke="#6366f1" fill="url(#gradB)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className={styles.centerPanel}>
          <div className={styles.resultCard}>
            {!res && <div>No certificate checked yet.</div>}
            {res && res.ok && <motion.div className={styles.resultValid}><CheckCircle /> Certificate VALID</motion.div>}
            {res && !res.ok && <motion.div className={styles.resultInvalid}><XCircle /> INVALID CERTIFICATE</motion.div>}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.rightPanel}>
          <div className={styles.panelCard}>
            <div>Filters</div>
            <button className={styles.panelButton}><Activity /> Today</button>
            <button className={styles.panelButton}><Archive /> Last 7 Days</button>
            <button className={styles.panelButton}><User /> By Verify</button>
          </div>
          <div className={styles.panelCard} style={{marginTop:'1rem'}}>
            <div>Actions</div>
            <button className={styles.actionButton}><Download /> Export PDF</button>
            <button className={styles.actionButton}>Flag to Registry</button>
            <button className={styles.actionButton}>Request Manual Review</button>
          </div>
        </div>

      </div>
    </div>
  );
}
