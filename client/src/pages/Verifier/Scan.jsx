import React, { useState } from "react";
import { CheckCircle, XCircle, QrCode } from "lucide-react";
import styles from "./Scan.module.css";

export default function Scan() {
  const [scannedId, setScannedId] = useState("");
  const [result, setResult] = useState(null);

  const handleScan = () => {
    // Mock scan result
    const mockId = "BUK-2025-00121";
    setScannedId(mockId);
    setResult(mockId === "BUK-2025-00121" ? "VALID" : "INVALID");
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Scan Certificate QR</h2>

      <div className={styles.scanCard}>
        <div className={styles.qrPlaceholder}>
          <QrCode size={60} className={styles.qrIcon} />
          <p>QR Scanner Placeholder</p>
        </div>

        <button className={styles.scanButton} onClick={handleScan}>
          Scan QR
        </button>

        {result && (
          <div className={`${result === "VALID" ? styles.resultValid : styles.resultInvalid}`}>
            {result === "VALID" ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span>Certificate is {result}</span>
          </div>
        )}
      </div>
    </div>
  );
}
