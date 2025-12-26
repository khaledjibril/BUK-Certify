import React, { useEffect, useMemo, useState } from "react";
import { Eye, Ban } from "lucide-react";
import styles from "./Certificates.module.css";
import { certificateApi } from "../../services/certificateApi";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    studentName: "",
    regNumber: "",
    course: "",
    graduationYear: "",
    issueDate: "",
    gradeType: "CLASS",
    gradeValue: "",
  });

  const [file, setFile] = useState(null);

  /* -------------------------------- Toast -------------------------------- */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  /* ------------------------------- Fetch Certs ----------------------------- */
  const fetchCertificates = async () => {
    try {
      const data = await certificateApi.list();
      setCerts(data);
    } catch (err) {
      showToast(err.message || "Failed to load certificates");
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  /* ----------------------------- Upload Handler ---------------------------- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return showToast("Please select a certificate image");

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("certificate", file);

    try {
      setLoading(true);
      const res = await certificateApi.upload(data);

      setCerts((prev) => [res.certificate, ...prev]);
      showToast("Certificate uploaded successfully");

      setForm({
        studentName: "",
        regNumber: "",
        course: "",
        graduationYear: "",
        issueDate: "",
        gradeType: "CLASS",
        gradeValue: "",
      });
      setFile(null);
    } catch (err) {
      showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------ Revoke Cert ------------------------------ */
  const revokeCertificate = async (id) => {
    if (!window.confirm("Revoke this certificate?")) return;

    try {
      await certificateApi.revoke(id);
      setCerts((s) =>
        s.map((c) => (c.id === id ? { ...c, status: "REVOKED" } : c))
      );
      showToast("Certificate revoked");
    } catch (err) {
      showToast(err.message || "Failed to revoke certificate");
    }
  };

  /* ------------------------------- KPI Stats ------------------------------- */
  const stats = useMemo(() => {
    const total = certs.length;
    const active = certs.filter((c) => c.status === "ACTIVE").length;
    const revoked = certs.filter((c) => c.status === "REVOKED").length;
    return { total, active, revoked };
  }, [certs]);

  /* --------------------------------- JSX ---------------------------------- */
  return (
    <div className={styles.container}>
      {/* KPI */}
      <div className={styles.kpiGrid}>
        <Kpi label="Total" value={stats.total} />
        <Kpi label="Active" value={stats.active} green />
        <Kpi label="Revoked" value={stats.revoked} red />
      </div>

      {/* Upload */}
      <div className={styles.card}>
        <h3>Upload Certificate</h3>
        <form onSubmit={handleUpload} className={styles.form}>
          <input
            placeholder="Student Full Name"
            value={form.studentName}
            onChange={(e) => setForm({ ...form, studentName: e.target.value })}
            required
          />
          <input
            placeholder="Registration Number"
            value={form.regNumber}
            onChange={(e) => setForm({ ...form, regNumber: e.target.value })}
            required
          />
          <input
            placeholder="Course / Programme"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            required
          />

          <select
            value={form.gradeType}
            onChange={(e) => setForm({ ...form, gradeType: e.target.value })}
          >
            <option value="CLASS">Degree Class</option>
            <option value="GPA">GPA</option>
          </select>

          <input
            placeholder={
              form.gradeType === "CLASS"
                ? "e.g. First Class Honours"
                : "e.g. 4.52"
            }
            value={form.gradeValue}
            onChange={(e) => setForm({ ...form, gradeValue: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Graduation Year"
            value={form.graduationYear}
            onChange={(e) =>
              setForm({ ...form, graduationYear: e.target.value })
            }
            required
          />

          <input
            type="date"
            value={form.issueDate}
            onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Cert No</th>
              <th>Student</th>
              <th>Reg No</th>
              <th>Course</th>
              <th>Status</th>
              <th>Issued</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((c) => (
              <tr key={c.id}>
                <td>{c.certificateNumber}</td>
                <td>{c.studentName}</td>
                <td>{c.regNumber}</td>
                <td>{c.course}</td>
                <td
                  className={
                    c.status === "ACTIVE"
                      ? styles.active
                      : styles.revoked
                  }
                >
                  {c.status}
                </td>
                <td>{new Date(c.issueDate).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <button onClick={() => setPreview(c)}>
                    <Eye size={16} />
                  </button>
                  {c.status === "ACTIVE" && (
                    <button onClick={() => revokeCertificate(c.id)}>
                      <Ban size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview */}
      {preview && (
        <Modal onClose={() => setPreview(null)}>
          <img
            src={preview.certificateImageUrl}
            alt="Certificate"
            className={styles.previewImg}
          />
        </Modal>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}

/* ---------------------------- Helper Components --------------------------- */

function Kpi({ label, value, green, red }) {
  return (
    <div
      className={`${styles.kpi} ${green ? styles.green : ""} ${
        red ? styles.red : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modalBox}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
