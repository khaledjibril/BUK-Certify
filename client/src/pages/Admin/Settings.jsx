import React, { useState } from 'react';
import styles from './Settings.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader} onClick={() => setOpen(!open)}>
        <h2>{title}</h2>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {open && <div className={styles.sectionContent}>{children}</div>}
    </div>
  );
};

export default function Settings() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>University System Settings</h1>

      <Section title="Email & Notifications">
        <p>Configure SMTP, notification templates, and mass email rules.</p>
        <button className={styles.button}>Edit Email Settings</button>
      </Section>

      <Section title="Verification Rules">
        <p>Set student verification, email verification, and MFA policies.</p>
        <button className={styles.button}>Edit Verification Rules</button>
      </Section>

      <Section title="Admin Accounts & Roles">
        <p>Manage admin accounts, roles, and permissions hierarchy.</p>
        <button className={styles.button}>Manage Admins</button>
      </Section>

      <Section title="System Preferences">
        <p>Change timezone, language, theme, and logging preferences.</p>
        <button className={styles.button}>Edit Preferences</button>
      </Section>

      <Section title="Security Settings">
        <p>Configure password policy, IP restrictions, and view audit logs.</p>
        <button className={styles.button}>Edit Security</button>
      </Section>
    </div>
  );
}
