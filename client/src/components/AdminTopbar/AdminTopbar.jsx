import React from 'react';
import styles from './AdminTopbar.module.css';


export default function AdminTopbar() {
const adminName =  'Admin';


return (
<header className={styles.topbar}>
<div className={styles.left}>Welcome back, <strong>{adminName}</strong></div>
<div className={styles.right}>
<div className={styles.searchWrap}>
<input className={styles.search} placeholder="Search users, certificates..." />
</div>
</div>
</header>
);
}