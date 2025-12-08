// src/pages/Verifier/Notifications.jsx
import React from "react";
import Card from "../../components/Card";

export default function Notifications() {
  const notifications = [
    { type: "alert", message: "Multiple failed verification attempts detected." },
    { type: "info", message: "New certificates uploaded successfully." },
    { type: "alert", message: "System maintenance scheduled for 2025-12-10." },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Notifications
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {notifications.map((notif, i) => (
          <Card key={i}>
            <div
              style={{
                padding: 16,
                borderRadius: 10,
                background:
                  notif.type === "alert" ? "#fee2e2" : "#dbeafe", // red / blue soft bg
                fontWeight: 500,
              }}
            >
              {notif.message}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
