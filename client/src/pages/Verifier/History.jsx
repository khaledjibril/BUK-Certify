// src/pages/Verifier/History.jsx
import React from "react";
import Card from "../../components/Card";

export default function History() {
  const historyData = [
    { name: "Amina Yusuf", uvc: "BUK1234", status: "Verified", date: "2025-12-01" },
    { name: "Sadiq Bello", uvc: "BUK1235", status: "Failed", date: "2025-12-01" },
    { name: "Ibrahim Musa", uvc: "BUK1236", status: "Verified", date: "2025-12-02" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Verification History
      </h1>

      <Card>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: 10 }}>Name</th>
                <th style={{ textAlign: "left", padding: 10 }}>UVC</th>
                <th style={{ textAlign: "left", padding: 10 }}>Status</th>
                <th style={{ textAlign: "left", padding: 10 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <td style={{ padding: 10 }}>{item.name}</td>
                  <td style={{ padding: 10 }}>{item.uvc}</td>
                  <td
                    style={{
                      padding: 10,
                      fontWeight: 600,
                      color:
                        item.status === "Verified"
                          ? "#16a34a"
                          : "#dc2626",
                    }}
                  >
                    {item.status}
                  </td>
                  <td style={{ padding: 10 }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
