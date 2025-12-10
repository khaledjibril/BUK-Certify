import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Sidebar from "../../components/VerifierSidebar/Sidebar";
import TopBar from "../../components/VerifierTopBar/TopBar";
import styles from "./VerifierDashboard.module.css";

// Mock Data
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
  { id: "BUK-2025-00121", name: "Muhammad Abdullahi", program: "B.Sc Computer Science", status: "VALID", time: "2 mins ago" },
  { id: "BUK-2025-00411", name: "Aisha Sadiq", program: "MBA", status: "INVALID", time: "12 mins ago" },
];

export default function VerifierDashboard() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    setResult(certificateId === "BUK-2025-00121" ? "VALID" : "INVALID");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className={styles.main}>
        <TopBar />

        {/* Stats */}
        <div className={styles.statsGrid}>
          {verificationStats.map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className={styles.statCard}>
              <div className="text-slate-500">{stat.title}</div>
              <div className="text-3xl font-bold mt-2">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Verify Zone & Chart */}
        <div className={styles.verifyGrid}>
          <div className={styles.verifyCard}>
            <h3 className="text-lg font-semibold mb-4">Instant Certificate Verification</h3>
            <div className="flex gap-4">
              <input
                className={styles.verifyInput}
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter Certificate ID or Scan QR"
              />
              <button className={styles.verifyButton} onClick={handleVerify}>Verify</button>
            </div>
            {result && (
              <div className={`${result === "VALID" ? styles.resultValid : styles.resultInvalid} mt-6 p-4 rounded-xl flex items-center gap-3`}>
                {result === "VALID" ? <CheckCircle /> : <XCircle />}
                <span className="font-semibold">Certificate is {result}</span>
              </div>
            )}
          </div>

          <div className={styles.chartCard}>
            <h3 className="text-lg font-semibold mb-4">Verification Activity</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification History */}
        <div className={styles.historyCard}>
          <h3 className="text-lg font-semibold mb-4">Recent Verification History</h3>
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
                  <td className="py-3 font-medium">{item.id}</td>
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
        </div>
      </main>
    </div>
  );
}
