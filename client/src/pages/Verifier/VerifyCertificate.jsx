// src/pages/Verifier/VerifyCertificate.jsx
import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function VerifyCertificate() {
  const [uvc, setUvc] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    // TODO: integrate API call
    setResult({
      name: "Amina Yusuf",
      status: "Verified",
      certificate: "BSc Computer Science",
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Verify Certificate
      </h1>

      <Card>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            value={uvc}
            onChange={(e) => setUvc(e.target.value)}
            placeholder="Enter Unique Verification Code (UVC)"
            style={{
              flex: 1,
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          />

          <Button onClick={handleVerify}>Verify</Button>
        </div>

        {result && (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              background: "#f3f4f6",
              borderRadius: 10,
            }}
          >
            <p>
              <strong>Name:</strong> {result.name}
            </p>
            <p>
              <strong>Status:</strong> {result.status}
            </p>
            <p>
              <strong>Certificate:</strong> {result.certificate}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
