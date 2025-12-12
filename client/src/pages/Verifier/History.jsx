import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import styles from "./History.module.css";

// ================= MOCK DATA =================
const verificationHistory = [
  { id: "BUK-2025-00121", name: "Muhammad Abdullahi", program: "B.Sc Computer Science", status: "VALID", time: "2 mins ago" },
  { id: "BUK-2025-00411", name: "Aisha Sadiq", program: "MBA", status: "INVALID", time: "12 mins ago" },
  { id: "BUK-2025-00345", name: "Hassan Bello", program: "B.Sc Economics", status: "VALID", time: "1 hour ago" },
];

export default function History() {
  const [filter, setFilter] = useState("");

  const filteredHistory = verificationHistory.filter(
    (item) =>
      item.id.includes(filter) ||
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.program.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Verification History</h2>

      <div className={styles.filterRow}>
        <input
          placeholder="Search by ID, Name or Program"
          className={styles.searchInput}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.historyCard}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Name</th>
              <th>Programme</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.program}</td>
                <td>
                  <span className={item.status === "VALID" ? styles.statusValid : styles.statusInvalid}>
                    {item.status}
                  </span>
                </td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
