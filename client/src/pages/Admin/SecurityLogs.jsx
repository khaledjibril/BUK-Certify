import React, { useEffect, useState } from "react";
import styles from "./AuditLogs.module.css";
import * as adminApi from "../../services/verifycertificate.js";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    adminApi.getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className={styles.page}>
      <h1>Verification Logs</h1>

      <table>
        <thead>
          <tr>
            <th>Verifier</th>
            <th>UVC</th>
            <th>Certificate</th>
            <th>IP</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.email}</td>
              <td>{l.uvc_code}</td>
              <td>{l.certificate_number}</td>
              <td>{l.ip_address}</td>
              <td>{l.result}</td>
              <td>{new Date(l.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
