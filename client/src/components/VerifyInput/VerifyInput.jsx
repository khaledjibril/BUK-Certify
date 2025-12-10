import React from 'react';
import styles from './VerifyInput.module.css';
import { QrCode, Camera } from 'lucide-react';

export default function VerifyInput({ id, setId, onVerify, loading }) {
  return (
    <div className={styles.inputGroup}>
      <input value={id} onChange={e=>setId(e.target.value)} placeholder="BUK-2025-00121" className={styles.inputField}/>
      <button className={styles.buttonPrimary} onClick={onVerify}>{loading?'Verifying…':'Verify'}</button>
      <div style={{display:'flex', gap:'0.5rem', marginTop:'1rem'}}>
        <button className={styles.buttonSecondary}><QrCode /> Scan QR</button>
        <button className={styles.buttonSecondary}><Camera /> Live Camera</button>
      </div>
    </div>
  );
}
