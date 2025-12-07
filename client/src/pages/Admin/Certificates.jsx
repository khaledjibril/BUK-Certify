import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Eye, FilePlus } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import styles from './Certificates.module.css';

export default function Certificates({ userRole = "admin" }) {
  const [certs, setCerts] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [preview, setPreview] = useState(null);
  const [showAudit, setShowAudit] = useState(false);
  const [auditLog, setAuditLog] = useState([]);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState(null);

  const totals = useMemo(() => {
    const total = certs.length;
    const active = certs.filter((c) => c.status === "Active").length;
    const revoked = certs.filter((c) => c.status === "Revoked").length;
    const thisMonth = certs.filter((c) => {
      if (!c.uploadedAt) return false;
      const d = new Date(c.uploadedAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return { total, active, revoked, thisMonth };
  }, [certs]);

  const addAudit = (action, cert) => {
    setAuditLog((s) => [
      { id: Date.now(), action, certId: cert?.id ?? null, actor: userRole, at: new Date().toISOString(), meta: cert ?? null },
      ...s,
    ]);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const generateVerificationHash = (file, meta = {}) => {
    const str = `${file.name}-${file.size}-${meta.regNumber || ""}-${meta.studentName || ""}`;
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return `vc-${Math.abs(h).toString(36)}`;
  };

  const handleFiles = async (files, sharedMeta = {}) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const created = await Promise.all(
      arr.map(async (file) => {
        const url = URL.createObjectURL(file);
        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        const cert = {
          id,
          studentName: sharedMeta.studentName || "Unknown",
          regNumber: sharedMeta.regNumber || "-",
          course: sharedMeta.course || "-",
          fileName: file.name,
          fileType: file.type || (isPdf ? "application/pdf" : "image/*"),
          fileUrl: url,
          qr: `${window.location.origin}/verify/${generateVerificationHash(file, sharedMeta)}`,
          status: "Active",
          uploadedAt: new Date().toISOString(),
          verificationHash: generateVerificationHash(file, sharedMeta),
        };
        return cert;
      })
    );
    setCerts((s) => [...created, ...s]);
    created.forEach((c) => addAudit("upload", c));
    showToast(`${created.length} certificate(s) uploaded`);
  };

  const handleSingleUploadSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const f = form.file.files[0];
    if (!f) return showToast("Please choose a file");
    const meta = { studentName: form.studentName.value, regNumber: form.regNumber.value, course: form.course.value };
    handleFiles([f], meta);
    form.reset();
  };

  const toggleSelect = (id) => {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const selectAllVisible = (visible) => {
    const ids = visible.map((c) => c.id);
    setSelected(new Set(ids));
  };

  const bulkDelete = () => {
    if (userRole !== "super" && userRole !== "admin") return showToast("You don't have permission to delete");
    if (!selected.size) return showToast("No certificates selected");
    if (!confirm(`Delete ${selected.size} certificate(s)?`)) return;
    setCerts((s) => s.filter((c) => !selected.has(c.id)));
    addAudit("bulk_delete", { ids: Array.from(selected) });
    setSelected(new Set());
    showToast("Deleted selected certificates");
  };

  const bulkRevoke = () => {
    if (!selected.size) return showToast("No certificates selected");
    setCerts((s) => s.map((c) => (selected.has(c.id) ? { ...c, status: "Revoked" } : c)));
    addAudit("bulk_revoke", { ids: Array.from(selected) });
    setSelected(new Set());
    showToast("Revoked selected certificates");
  };

  const visibleCerts = useMemo(() => {
    return certs.filter((c) => {
      if (search) {
        const s = search.toLowerCase();
        if (!(c.studentName.toLowerCase().includes(s) || c.regNumber.toLowerCase().includes(s) || c.course.toLowerCase().includes(s))) return false;
      }
      if (filterCourse !== "all" && c.course !== filterCourse) return false;
      if (filterStatus !== "all" && c.status !== filterStatus) return false;
      if (dateFrom && new Date(c.uploadedAt) < new Date(dateFrom)) return false;
      if (dateTo && new Date(c.uploadedAt) > new Date(dateTo)) return false;
      return true;
    }).slice(0, 500);
  }, [certs, search, filterCourse, filterStatus, dateFrom, dateTo]);

  const openPreview = (cert) => {
    setPreview({ cert, type: cert.fileType.includes("pdf") ? "pdf" : "image", url: cert.fileUrl });
    addAudit("preview", cert);
  };

  const downloadCert = (cert) => {
    const a = document.createElement("a");
    a.href = cert.fileUrl;
    a.download = cert.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    addAudit("download", cert);
    showToast("Download started");
  };

  const toggleStatus = (certId) => {
    setCerts((s) => s.map((c) => (c.id === certId ? { ...c, status: c.status === "Active" ? "Revoked" : "Active" } : c)));
    addAudit("toggle_status", { certId });
  };

  const courses = Array.from(new Set(certs.map((c) => c.course))).filter(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.kpiGrid}>
        <KpiCard title="Total Certificates" value={totals.total} />
        <KpiCard title="Active" value={totals.active} positive />
        <KpiCard title="Revoked" value={totals.revoked} negative />
        <KpiCard title="This Month" value={totals.thisMonth} />
      </div>

      <div className={styles.flexRow}>
        <div className={styles.uploadPanel}>
          <div className={styles.uploadHeader}>
            <h3>Upload Certificates</h3>
            <button onClick={() => fileInputRef.current?.click()} className={styles.bulkBtn}>
              <FilePlus size={16} /> Bulk Upload
            </button>
            <input ref={fileInputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg" className={styles.hiddenFile} onChange={(e) => handleFiles(e.target.files)} />
          </div>
          <form onSubmit={handleSingleUploadSubmit} className={styles.uploadForm}>
            <input name="studentName" placeholder="Student Full Name" className={styles.input} />
            <input name="regNumber" placeholder="Registration Number" className={styles.input} />
            <input name="course" placeholder="Course / Program" className={styles.input} />
            <div className={styles.fileSubmitRow}>
              <input name="file" type="file" accept=".pdf,.png,.jpg,.jpeg" className={styles.input} />
              <button className={styles.btn}>Upload</button>
            </div>
          </form>
        </div>

        <div className={styles.filterPanel}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student or reg no" className={styles.input} />
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className={styles.input}>
            <option value="all">All Courses</option>
            <option value="csc">Computer Science</option>
            <option value="se">Software Engineering</option>
            <option value="cs">Cyber Security</option>
            <option value="it">Information Technology</option>
            {courses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={styles.input}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Revoked">Revoked</option>
          </select>
          <div className={styles.dateRow}>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={styles.input} />
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={styles.input} />
          </div>
          <button onClick={() => setShowAudit(true)} className={styles.btnOutline}>Audit Log</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th><th>Student</th><th>Reg No</th><th>Course</th><th>QR</th><th>Status</th><th>Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleCerts.length===0 && <tr><td colSpan={8}>No certificates match your search/filters.</td></tr>}
            {visibleCerts.map((c, idx) => (
              <tr key={c.id} className={styles.row}>
                <td><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleSelect(c.id)} /></td>
                <td>{c.studentName}<div className={styles.fileName}>{c.fileName}</div></td>
                <td>{c.regNumber}</td><td>{c.course}</td>
                <td><QRCodeSVG  value={c.qr} size={64} /></td>
                <td className={c.status==='Active'?styles.activeBadge:styles.revokedBadge}>{c.status}</td>
                <td>{new Date(c.uploadedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => openPreview(c)} className={styles.iconBtn}><Eye size={14}/></button>
                  <button onClick={() => downloadCert(c)} className={styles.iconBtn}><Download size={14}/></button>
                  {userRole!=='verifier' && <button onClick={() => toggleStatus(c.id)} className={styles.iconBtn}>{c.status==='Active'?'Revoke':'Activate'}</button>}
                  {userRole==='super' && <button onClick={() => { if(confirm('Delete this certificate?')) { setCerts((s)=>s.filter(x=>x.id!==c.id)); addAudit('delete', c); showToast('Deleted'); } }} className={styles.iconBtnRed}><Trash2 size={14}/></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {preview && <Modal onClose={() => setPreview(null)}>
        <div className={styles.modalContent}>
          <h3>{preview.cert.studentName} - {preview.cert.fileName}</h3>
          {preview.type==='pdf'?<iframe src={preview.url} className={styles.pdfIframe}></iframe>:<img src={preview.url} alt="preview" className={styles.imgPreview}/>}
          <QRCodeSVG  value={preview.cert.qr} size={96} />
        </div>
      </Modal>}

      {showAudit && <Modal onClose={() => setShowAudit(false)}>
        <div className={styles.modalContent}>
          <h3>Audit Log</h3>
          {auditLog.length===0?'No audit records yet.':auditLog.map(a=><div key={a.id}>{a.action} by {a.actor}</div>)}
        </div>
      </Modal>}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}

function KpiCard({ title, value, positive, negative }) {
  return <div className={styles.kpiCard}>{title}: {value}</div>;
}

function Modal({ children, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBg} onClick={onClose}></div>
      <motion.div initial={{scale:0.98,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.98,opacity:0}} className={styles.modalBox}>
        <button className={styles.modalClose} onClick={onClose}>Close</button>
        {children}
      </motion.div>
    </div>
  );
}
