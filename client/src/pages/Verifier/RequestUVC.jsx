import React, { useState } from "react";
import styles from "./RequestUvc.module.css";
import { verifierApi } from "../../services/verifierApi";

export default function RequestUvc() {
  const [limit, setLimit] = useState(10);
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitRequest = async () => {
    if (!reason) {
      setError("REASON IS REQUIRED");
      return;
    }

    try {
      await verifierApi.requestUvc({
        requestedLimit: limit,
        reason,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "REQUEST FAILED");
    }
  };

  if (success) {
    return (
      <div className={styles.page}>
        <h2>REQUEST SUBMITTED</h2>
        <p>ADMIN WILL REVIEW YOUR REQUEST.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>REQUEST UVC ACCESS</h1>

      <div className={styles.card}>
        <label>REQUESTED SEARCH LIMIT</label>
        <input
          type="number"
          min={1}
          max={500}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />

        <label>REASON FOR REQUEST</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button onClick={submitRequest}>SUBMIT REQUEST</button>
      </div>
    </div>
  );
}
