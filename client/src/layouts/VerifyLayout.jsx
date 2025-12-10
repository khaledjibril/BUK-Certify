import React from 'react';
import styles from './VerifyLayout.module.css';

export default function VerifyLayout({ children }) {
  return (
    <div className={styles.layout}>
      {/* Optional: Add top bar, sidebar */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
