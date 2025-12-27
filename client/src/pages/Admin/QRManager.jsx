import React, { useEffect, useState } from "react";
import styles from "./AdminUvcRequests.module.css";
import * as adminApi from "../../services/verifycertificate.js";

export default function AdminUvcRequests() {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    const data = await adminApi.getUvcRequests();
    setRequests(data);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await adminApi.approveUvc(id);
    load();
  };

  const reject = async (id) => {
    await adminApi.rejectUvc(id);
    load();
  };

  return (
    <div className={styles.page}>
      <h1>UVC Requests</h1>

      {requests.map((r) => (
        <div key={r.id} className={styles.card}>
          <p><strong>Verifier:</strong> {r.email}</p>
          <p><strong>Requested Limit:</strong> {r.requested_limit}</p>
          <p>{r.reason}</p>

          <div className={styles.actions}>
            <button onClick={() => approve(r.id)}>Approve</button>
            <button onClick={() => reject(r.id)} className={styles.reject}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
