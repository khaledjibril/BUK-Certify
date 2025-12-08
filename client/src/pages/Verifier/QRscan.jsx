// src/pages/Verifier/QRScan.jsx
import React from "react";
import Card from "../../components/Card";

export default function QRScan() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        QR Scan
      </h1>

      <Card>
        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <p>
            Scan the QR code of a BUK certificate to verify instantly.
          </p>

          <div
            style={{
              width: 192,
              height: 192,
              background: "#e5e7eb",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            QR Scanner Placeholder
          </div>
        </div>
      </Card>
    </div>
  );
}
