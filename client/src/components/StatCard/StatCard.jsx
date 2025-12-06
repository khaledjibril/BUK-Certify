import React from 'react';
import styles from './StatCard.module.css';


export default function StatCard({ title, value, subtitle }) {
return (
<div className={styles.card}>
<div className={styles.title}>{title}</div>
<div className={styles.value}>{value}</div>
{subtitle && <div className={styles.subtitle}>{subtitle}</div>}
</div>
);
}