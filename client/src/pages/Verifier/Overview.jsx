// src/pages/Verifier/Overview.jsx
import React from "react";
import VerifierLayoutB from "../../layouts/VerifierLayout";
import Card from "../../components/Card";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Users, QrCode, Bell } from "lucide-react";

export default function Overview() {
  return (
    <VerifierLayoutB>
      <div style={{ minHeight: "100vh", padding: 24, background: "#f9fafb" }}>
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {[
            { label: "Total Verifications", value: "3,482", icon: ShieldCheck },
            { label: "Verifications Today", value: "126", icon: FileText },
            { label: "Failed Attempts", value: "18", icon: Users },
            { label: "QR Scans Today", value: "94", icon: QrCode },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <div
                  style={{
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ fontSize: 13, color: "#6b7280" }}>
                      {stat.label}
                    </p>
                    <h2 style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>
                      {stat.value}
                    </h2>
                  </div>
                  <stat.icon size={32} color="#6b7280" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Verifications + System Alerts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 24,
          }}
        >
          {/* Recent Verifications */}
          <Card>
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                Recent Verifications
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Amina Yusuf", "Sadiq Bello", "Ibrahim Musa"].map((name, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 14,
                      borderBottom: "1px solid #e5e7eb",
                      paddingBottom: 8,
                    }}
                  >
                    <span>{name}</span>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* System Alerts */}
          <Card>
            <div style={{ padding: 24 }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Bell size={18} /> System Alerts
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div>⚠️ Multiple failed verification attempts detected.</div>
                <div>✅ New certificates uploaded successfully.</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Verification Trends Chart */}
        <div style={{ marginTop: 32 }}>
          <Card>
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                Verification Trends
              </h3>
              <div
                style={{
                  height: 260,
                  background: "#f3f4f6",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                Chart placeholder (integrate Chart.js or Recharts)
              </div>
            </div>
          </Card>
        </div>
      </div>
    </VerifierLayoutB>
  );
}
