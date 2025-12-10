// src/components/StatCard/StatCard.jsx
import React from 'react';
import styles from './StatCard.module.css';

export default function StatCard({ title, value, icon, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.footer}>{children}</div>
    </div>
  );
}
