import React from "react";
import styles from "./NavIcon.module.css";

export default function NavIcon({ icon, active, onClick }) {
  return (
    <div
      className={`${styles.icon} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
}
