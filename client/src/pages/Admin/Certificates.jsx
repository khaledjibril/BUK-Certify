import React, { useEffect, useMemo, useState } from "react";
import { Eye, Ban, RefreshCw, Loader2 } from "lucide-react";
import styles from "./Certificates.module.css";
import { certificateApi } from "../../services/certificateApi";

const ITEMS_PER_PAGE = 8;

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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

  /* ================= Toast ================= */
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  /* ================= Fetch ================= */
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await certificateApi.list();

      // 🔥 FORCE DB DATA TO UPPERCASE
      const normalized = data.map((c) => ({
        ...c,
        studentName: c.studentName?.toUpperCase(),
        regNumber: c.regNumber?.toUpperCase(),
        course: c.course?.toUpperCase(),
        certificateNumber: c.certificateNumber?.toUpperCase(),
        status: c.status?.toUpperCase(),
      }));

      setCerts(normalized);
    } catch (err) {
      showToast(err.message || "Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  /* ================= Upload ================= */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return showToast("PLEASE SELECT A CERTIFICATE IMAGE");

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) =>
      data.append(k, typeof v === "string" ? v.toUpperCase() : v)
    );
    data.append("certificate", file);

    try {
      setLoading(true);
      const res = await certificateApi.upload(data);

      setCerts((prev) => [
        {
          ...res.certificate,
          studentName: res.certificate.studentName?.toUpperCase(),
          regNumber: res.certificate.regNumber?.toUpperCase(),
          course: res.certificate.course?.toUpperCase(),
          certificateNumber: res.certificate.certificateNumber?.toUpperCase(),
          status: res.certificate.status?.toUpperCase(),
        },
        ...prev,
      ]);

      showToast("CERTIFICATE UPLOADED");
      setFile(null);
    } catch (err) {
      showToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= Revoke ================= */
  const revokeCertificate = async (id) => {
    if (!window.confirm("REVOKE THIS CERTIFICATE?")) return;

    try {
      await certificateApi.revoke(id);
      setCerts((s) =>
        s.map((c) =>
          c.id === id ? { ...c, status: "REVOKED" } : c
        )
      );
      showToast("CERTIFICATE REVOKED");
    } catch (err) {
      showToast(err.message || "FAILED TO REVOKE");
    }
  };

  /* ================= KPI ================= */
  const stats = useMemo(() => {
    return {
      total: certs.length,
      active: certs.filter((c) => c.status === "ACTIVE").length,
      revoked: certs.filter((c) => c.status === "REVOKED").length,
    };
  }, [certs]);

  /* ================= Filtering ================= */
  const filtered = useMemo(() => {
    return certs.filter((c) => {
      if (!search) return true;
      const q = search.toUpperCase();
      return (
        c.studentName?.includes(q) ||
        c.regNumber?.includes(q) ||
        c.certificateNumber?.includes(q)
      );
    });
  }, [certs, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  /* ================= JSX ================= */
  return (
    <div className={styles.container}>
      {/* KPI */}
      <div className={styles.kpiGrid}>
        <Kpi label="TOTAL" value={stats.total} />
        <Kpi label="ACTIVE" value={stats.active} green />
        <Kpi label="REVOKED" value={stats.revoked} red />
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <input
          placeholder="SEARCH NAME / REG NO / CERT NO"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchCertificates} disabled={loading}>
          <RefreshCw
            size={14}
            className={loading ? styles.spin : ""}
          />
          REFRESH
        </button>
      </div>

      {/* Upload */}
      <div className={styles.card}>
        <h3>UPLOAD CERTIFICATE</h3>
        <form onSubmit={handleUpload} className={styles.form}>
          <input
            placeholder="STUDENT FULL NAME"
            value={form.studentName}
            onChange={(e) =>
              setForm({ ...form, studentName: e.target.value })
            }
            required
          />
          <input
            placeholder="REGISTRATION NUMBER"
            value={form.regNumber}
            onChange={(e) =>
              setForm({ ...form, regNumber: e.target.value })
            }
            required
          />
          <input
            placeholder="COURSE / PROGRAMME"
            value={form.course}
            onChange={(e) =>
              setForm({ ...form, course: e.target.value })
            }
            required
          />

          <select
            value={form.gradeType}
            onChange={(e) =>
              setForm({ ...form, gradeType: e.target.value })
            }
          >
            <option value="CLASS">DEGREE CLASS</option>
            <option value="GPA">GPA</option>
          </select>

          <input
            placeholder={
              form.gradeType === "CLASS"
                ? "FIRST CLASS HONOURS"
                : "4.52"
            }
            value={form.gradeValue}
            onChange={(e) =>
              setForm({ ...form, gradeValue: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="GRADUATION YEAR"
            value={form.graduationYear}
            onChange={(e) =>
              setForm({ ...form, graduationYear: e.target.value })
            }
            required
          />

          <input
            type="date"
            value={form.issueDate}
            onChange={(e) =>
              setForm({ ...form, issueDate: e.target.value })
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button disabled={loading}>
            {loading ? "UPLOADING..." : "UPLOAD"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.loader}>
            <Loader2 size={32} className={styles.spin} />
            LOADING CERTIFICATES…
          </div>
        ) : pageData.length === 0 ? (
          <div className={styles.empty}>NO CERTIFICATES FOUND</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>CERT NO</th>
                <th>STUDENT</th>
                <th>REG NO</th>
                <th>COURSE</th>
                <th>STATUS</th>
                <th>ISSUED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((c) => (
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
                  <td>
                    {new Date(c.issueDate).toLocaleDateString()}
                  </td>
                  <td className={styles.actions}>
                    <button onClick={() => setPreview(c)}>
                      <Eye size={16} />
                    </button>
                    {c.status === "ACTIVE" && (
                      <button
                        onClick={() => revokeCertificate(c.id)}
                      >
                        <Ban size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          ◀
        </button>
        <span>
          PAGE {page} OF {totalPages}
        </span>
        <button
          onClick={() =>
            setPage((p) => Math.min(totalPages, p + 1))
          }
        >
          ▶
        </button>
      </div>

      {/* PREVIEW */}
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

/* ================= Helpers ================= */

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
        <button onClick={onClose}>CLOSE</button>
        {children}
      </div>
    </div>
  );
}
