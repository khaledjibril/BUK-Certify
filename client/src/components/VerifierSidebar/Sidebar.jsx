import React from "react";
import { ShieldCheck, ScanLine, FileSearch, History, LogOut } from "lucide-react";
import NavIcon from "../VerifierNavIcon/NavIcon";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>BUK</div>
      <NavIcon icon={<ShieldCheck />} active />
      <NavIcon icon={<ScanLine />} />
      <NavIcon icon={<FileSearch />} />
      <NavIcon icon={<History />} />
      <div className={styles.bottom}>
        <NavIcon icon={<LogOut />} />
      </div>
    </aside>
  );
}
