import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import styles from "./Overview.module.css";

// ================= MOCK DATA =================

const verificationStats = [
  { title: "Today's Verifications", value: 128 },
  { title: "Valid Certificates", value: 119 },
  { title: "Invalid Flags", value: 9 },
  { title: "Total Verifications", value: 8432 },
];

const activityData = [
  { date: "Mon", value: 34 },
  { date: "Tue", value: 48 },
  { date: "Wed", value: 59 },
  { date: "Thu", value: 70 },
  { date: "Fri", value: 91 },
];

const verificationHistory = [
  {
    id: "BUK-2025-00121",
    name: "Muhammad Abdullahi",
    program: "B.Sc Computer Science",
    status: "VALID",
    time: "2 mins ago",
  },
  {
    id: "BUK-2025-00411",
    name: "Aisha Sadiq",
    program: "MBA",
    status: "INVALID",
    time: "12 mins ago",
  },
];

// ================= COMPONENT =================

export default function Overview() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    if (!certificateId) return;
    setResult(certificateId === "BUK-2025-00121" ? "VALID" : "INVALID");
  };

  return (
    <div className={styles.dashboard}>

      {/* ================= STATS ================= */}
      <div className={styles.statsGrid}>
        {verificationStats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={styles.statCard}
          >
            <p className={styles.statTitle}>{stat.title}</p>
            <p className={styles.statValue}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ================= VERIFY + CHART ================= */}
      <div className={styles.verifyGrid}>

        {/* ===== Verification Card ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.verifyCard}
        >
          <h3 className={styles.cardTitle}>
            Instant Certificate Verification
          </h3>

          <div className={styles.verifyRow}>
            <input
              className={styles.verifyInput}
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Enter Certificate ID or Scan QR"
            />
            <button
              onClick={handleVerify}
              className={styles.verifyButton}
            >
              Verify
            </button>
          </div>

          {result && (
            <div
              className={`${result === "VALID"
                ? styles.resultValid
                : styles.resultInvalid
              }`}
            >
              {result === "VALID"
                ? <CheckCircle size={20} />
                : <XCircle size={20} />
              }
              <span>Certificate is {result}</span>
            </div>
          )}
        </motion.div>

        {/* ===== Chart Card ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.chartCard}
        >
          <h3 className={styles.cardTitle}>
            Verification Activity
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* ================= HISTORY TABLE ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className={styles.historyCard}
      >
        <div className={styles.historyHeader}>
          <h3 className={styles.cardTitle}>
            Recent Verification History
          </h3>
        </div>

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
            {verificationHistory.map((item, i) => (
              <tr key={i}>
                <td className={styles.idCell}>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.program}</td>
                <td>
                  <span
                    className={
                      item.status === "VALID"
                        ? styles.statusValid
                        : styles.statusInvalid
                    }
                  >
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
