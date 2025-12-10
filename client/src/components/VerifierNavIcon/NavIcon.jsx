import React from "react";
import styles from "./NavIcon.module.css";

export default function NavIcon({ icon, active }) {
  return (
    <div
      className={`${styles.navIcon} ${active ? styles.active : styles.hover}`}
    >
      {icon}
    </div>
  );
}
