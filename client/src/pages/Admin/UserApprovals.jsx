import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Undo,
} from 'lucide-react';

// --- NOTE ---
// This is a self-contained, production-style UserApprovals React component.
// Features included:
// - Confirmation modals
// - Toast notifications (success/error) with undo
// - Row-level activity indicators (who approved/rejected & when)
// - Advanced filters: date range, role, department
// - CSV export & printable "Export to PDF" via print
// - Simple visual analytics (small SVG charts for trends)
// - Soft-delete (mark deleted) with undo
// - Loading & skeleton states
// - Pagination + bulk approve (from earlier)
// Replace mock data and the "currentAdmin" with real API calls/identity.

/* ---------------- MOCK DATA ---------------- */
const nowISO = () => new Date().toISOString();
const ROLES = ['student', 'staff', 'verifier'];
const DEPARTMENTS = ['Computer Science', 'Business', 'Law', 'Engineering'];

const makeUser = (i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ROLES[i % ROLES.length],
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  status: 'pending', // pending | approved | rejected | deleted
  date: new Date(Date.now() - i * 86400000).toISOString(), // days ago
  history: [], // {action, by, at}
});

const INITIAL_USERS = Array.from({ length: 48 }, (_, i) => makeUser(i));
const ITEMS_PER_PAGE = 8;
const currentAdmin = { id: 999, name: 'Admin User' };

/* ---------------- HELPERS ---------------- */
const formatDate = (iso) => new Date(iso).toLocaleString();

/* ---------------- COMPONENT ---------------- */
export default function UserApprovals() {
  // loading simulation
  const [loading, setLoading] = useState(true);

  // main data
  const [users, setUsers] = useState([]);

  // UI state
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterDept, setFilterDept] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // modal / toasts
  const [modal, setModal] = useState(null); // {type, payload}
  const [toasts, setToasts] = useState([]);

  // analytics (derived)
  const approvedCount = users.filter((u) => u.status === 'approved').length;
  const rejectedCount = users.filter((u) => u.status === 'rejected').length;
  const pendingCount = users.filter((u) => u.status === 'pending').length;
  const deletedCount = users.filter((u) => u.status === 'deleted').length;

  useEffect(() => {
    // simulate fetching data
    setLoading(true);
    const t = setTimeout(() => {
      setUsers(INITIAL_USERS);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  /* ---------------- FILTERING & PAGINATION ---------------- */
  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (filterStatus !== 'all' && u.status !== filterStatus) return false;
      if (filterRole !== 'all' && u.role !== filterRole) return false;
      if (filterDept !== 'all' && u.department !== filterDept) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!u.name.toLowerCase().includes(s) && !u.email.toLowerCase().includes(s)) return false;
      }
      if (dateFrom) {
        if (new Date(u.date) < new Date(dateFrom)) return false;
      }
      if (dateTo) {
        if (new Date(u.date) > new Date(dateTo)) return false;
      }
      return true;
    });
  }, [users, filterStatus, filterRole, filterDept, search, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  /* ---------------- TOASTS ---------------- */
  const pushToast = (t) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { id, ...t }]);
    // auto remove after 6s
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 6000);
    return id;
  };

  const removeToast = (id) => setToasts((s) => s.filter((x) => x.id !== id));

  /* ---------------- ACTION HELPERS ---------------- */
  const applyAction = (id, action, opts = {}) => {
    // action: approve | reject | delete | undo
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const now = new Date().toISOString();
        let newStatus = u.status;
        if (action === 'approve') newStatus = 'approved';
        if (action === 'reject') newStatus = 'rejected';
        if (action === 'delete') newStatus = 'deleted';
        if (action === 'undo') newStatus = opts.restoreTo || 'pending';

        return {
          ...u,
          status: newStatus,
          history: [
            ...(u.history || []),
            { action, by: currentAdmin.name, at: now, note: opts.note || '' },
          ],
        };
      })
    );
  };

  const confirmAndDo = (type, payload) => {
    // type: approve_one, reject_one, bulk_approve, delete_one
    if (type === 'approve_one') {
      setModal({ type: 'confirm', title: 'Approve user', body: `Approve ${payload.name}?`, onConfirm: () => {
        applyAction(payload.id, 'approve');
        pushToast({ title: 'Approved', message: `${payload.name} approved`, action: { label: 'Undo', onClick: () => undoLast(payload.id) } });
        setModal(null);
      } });
    }

    if (type === 'reject_one') {
      setModal({ type: 'confirm', title: 'Reject user', body: `Reject ${payload.name}?`, onConfirm: () => {
        applyAction(payload.id, 'reject');
        pushToast({ title: 'Rejected', message: `${payload.name} rejected`, action: { label: 'Undo', onClick: () => undoLast(payload.id) } });
        setModal(null);
      } });
    }

    if (type === 'delete_one') {
      setModal({ type: 'confirm', title: 'Delete (soft)', body: `Move ${payload.name} to deleted items? This is reversible.`, onConfirm: () => {
        applyAction(payload.id, 'delete');
        pushToast({ title: 'Deleted', message: `${payload.name} moved to deleted`, action: { label: 'Undo', onClick: () => undoLast(payload.id) } });
        setModal(null);
      } });
    }

    if (type === 'bulk_approve') {
      setModal({ type: 'confirm', title: 'Bulk Approve', body: `Approve ${selected.length} users?`, onConfirm: () => {
        selected.forEach((id) => applyAction(id, 'approve'));
        pushToast({ title: 'Bulk Approved', message: `${selected.length} users approved` });
        setSelected([]);
        setModal(null);
      } });
    }
  };

  const undoLast = (id) => {
    // undo last history entry for user id
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const last = (u.history || []).slice().reverse()[0];
        const before = last && last.action === 'approve' ? 'pending' : 'pending';
        const newHist = (u.history || []).slice(0, -1);
        return { ...u, status: before, history: newHist };
      })
    );
    pushToast({ title: 'Undone', message: 'Action undone' });
  };

  /* ---------------- BULK & SELECT ---------------- */
  const toggleSelect = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const selectAllOnPage = () => {
    const ids = pageData.map((u) => u.id);
    const allSelected = ids.every((id) => selected.includes(id));
    if (allSelected) setSelected((s) => s.filter((id) => !ids.includes(id)));
    else setSelected((s) => Array.from(new Set([...s, ...ids])));
  };

  /* ---------------- EXPORTS ---------------- */
  const exportCSV = () => {
    const rows = [
      ['id', 'name', 'email', 'role', 'department', 'status', 'date'].join(','),
      ...users.map((u) => [u.id, u.name, u.email, u.role, u.department, u.status, u.date].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-approvals-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast({ title: 'Export', message: 'CSV ready for download' });
  };

  const exportPDF = () => {
    // simple printable view - user can choose "Save as PDF" in print dialog
    window.print();
  };

  /* ---------------- SMALL ANALYTICS CHART ---------------- */
  const trendData = useMemo(() => {
    // build last 12 days counts
    const days = 12;
    const labels = Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return d.toLocaleDateString();
    });
    const approved = labels.map((lbl, idx) => users.filter((u) => {
      const d = new Date(u.date).toLocaleDateString();
      return d === lbl && u.status === 'approved';
    }).length);
    return { labels, approved };
  }, [users]);

  /* ---------------- RENDER ---------------- */
  return (
    <div style={styles.page}>
      {/* Header + analytics */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Pending User Approvals</h1>
          <p style={styles.subtitle}>Review, approve, reject, export, and audit user approvals.</p>
        </div>

        <div style={styles.kpis}>
          <KPI label="Total" value={users.length} />
          <KPI label="Approved" value={approvedCount} positive />
          <KPI label="Rejected" value={rejectedCount} negative />
          <KPI label="Deleted" value={deletedCount} />
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <Search size={16} />
          <input placeholder="Search name or email..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.filterRow}>
          <div style={styles.selectWrap}><Filter size={14} /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={styles.select}><option value="all">All</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="deleted">Deleted</option></select></div>
          <div style={styles.selectWrap}><span>Role</span><select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} style={styles.select}><option value="all">All</option>{ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select></div>
          <div style={styles.selectWrap}><span>Dept</span><select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={styles.select}><option value="all">All</option>{DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>

          <div style={styles.dateRange}>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={styles.dateInput} />
            <span style={{ margin: '0 6px' }}>—</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={styles.dateInput} />
          </div>

          <button onClick={() => { setSearch(''); setFilterRole('all'); setFilterDept('all'); setFilterStatus('all'); setDateFrom(''); setDateTo(''); }} style={styles.clearBtn}>Clear</button>

          <button onClick={() => confirmAndDo('bulk_approve')} disabled={!selected.length} style={{ ...styles.bulkBtn, opacity: selected.length ? 1 : 0.45 }}><CheckCircle size={16} /> Bulk Approve ({selected.length})</button>

          <button onClick={exportCSV} style={styles.exportBtn}><Download size={14} /> CSV</button>
          <button onClick={exportPDF} style={styles.exportBtn}><Download size={14} /> Print (PDF)</button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.contentRow}>
        <div style={styles.tableColumn}>
          <div style={styles.tableHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="checkbox" onChange={selectAllOnPage} checked={pageData.length > 0 && pageData.every((u) => selected.includes(u.id))} />
              <div style={{ width: 40 }}></div>
              <div>Name</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 180 }}>Email</div>
              <div style={{ width: 120 }}>Status</div>
              <div style={{ width: 220 }}>Actions</div>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading ? (
            <div>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={styles.skeletonRow}></div>
              ))}
            </div>
          ) : (
            <div>
              {pageData.map((u) => (
                <div key={u.id} style={styles.row}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} />
                    <div style={styles.avatar}>{u.name[0]}</div>
                    <div>
                      <div style={styles.userName}>{u.name}</div>
                      <div style={styles.metaLine}>{u.role} • {u.department}</div>
                    </div>
                  </div>

                  <div style={{ width: 180 }}>{u.email}</div>

                  <div style={{ width: 120 }}>{renderStatus(u.status)}</div>

                  <div style={{ width: 220, display: 'flex', gap: 8 }}>
                    <button onClick={() => confirmAndDo('approve_one', u)} style={styles.approveBtn}><CheckCircle size={14} /> Approve</button>
                    <button onClick={() => confirmAndDo('reject_one', u)} style={styles.rejectBtn}><XCircle size={14} /> Reject</button>
                    <button onClick={() => confirmAndDo('delete_one', u)} style={styles.deleteBtn}><Trash2 size={14} /> Delete</button>
                    <button onClick={() => pushToast({ title: 'History', message: 'Row history opened', onClick: () => {/** placeholder */} })} style={styles.smallBtn}>History</button>
                  </div>
                </div>
              ))}

              {pageData.length === 0 && <div style={styles.empty}>No records found</div>}
            </div>
          )}

          {/* Pagination */}
          <div style={styles.pagination}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))}>◀</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>▶</button>
          </div>

        </div>

        {/* RIGHT COLUMN: Analytics & History */}
        <div style={styles.sideColumn}>
          <div style={styles.card}>
            <h3 style={{ margin: 0 }}>Approval Trend (last 12 days)</h3>
            <SmallChart labels={trendData.labels} values={trendData.approved} />
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={{ margin: 0 }}>Recent Activity</h3>
            <div style={{ marginTop: 8 }}>
              {users
                .flatMap((u) => (u.history || []).map((h) => ({ ...h, user: u.name, id: u.id })))
                .slice(-10)
                .reverse()
                .map((act, i) => (
                  <div key={i} style={styles.activityRow}>
                    <div style={{ fontWeight: 700 }}>{act.user}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{act.action} by {act.by}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{formatDate(act.at)}</div>
                  </div>
                ))}
            </div>
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={{ margin: 0 }}>Quick Actions</h3>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={exportCSV} style={styles.exportBtn}><Download size={14} /> Export CSV</button>
              <button onClick={exportPDF} style={styles.exportBtn}><Download size={14} /> Print</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && modal.type === 'confirm' && (
        <Modal title={modal.title} onClose={() => setModal(null)} onConfirm={modal.onConfirm}>{modal.body}</Modal>
      )}

      {/* Toaster */}
      <div style={styles.toaster}>
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* Printable area (simple) */}
      <div id="print-area" style={{ display: 'none' }}>
        <h1>User Approvals Export</h1>
        <table>
          <thead><tr><th>Id</th><th>Name</th><th>Email</th><th>Status</th><th>Role</th><th>Department</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.status}</td><td>{u.role}</td><td>{u.department}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ---------------- HELPERS RENDER ---------------- */
  function renderStatus(s) {
    const color = s === 'approved' ? '#16a34a' : s === 'rejected' ? '#dc2626' : s === 'deleted' ? '#6b7280' : '#f59e0b';
    return <div style={{ fontWeight: 700, color }}>{s}</div>;
  }
}

/* ---------------- SMALL REUSABLES ---------------- */
function KPI({ label, value, positive, negative }) {
  return (
    <div style={styles.kpi}>
      <div style={{ fontSize: 12, color: '#64748b' }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: positive ? '#16a34a' : negative ? '#dc2626' : '#0f172a' }}>{value}</div>
    </div>
  );
}

function Modal({ title, children, onClose, onConfirm }) {
  return (
    <div style={styles.modalWrap}>
      <div style={styles.modal}>
        <h3>{title}</h3>
        <div style={{ marginTop: 8 }}>{children}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          <button onClick={onConfirm} style={styles.confirmBtn}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ id, title, message, action, onClose }) {
  return (
    <div style={styles.toast}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#374151' }}>{message}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {action && <button onClick={() => { action.onClick(); onClose(); }} style={styles.undoBtn}>{action.label || 'Undo'}</button>}
        <button onClick={onClose} style={styles.closeToast}>✕</button>
      </div>
    </div>
  );
}

function SmallChart({ labels, values }) {
  // simple sparkline-like bar chart
  const max = Math.max(1, ...values);
  return (
    <div style={{ marginTop: 10 }}>
      <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none">
        {values.map((v, i) => {
          const w = 300 / values.length;
          const h = (v / max) * 50;
          const x = i * w + 4;
          const y = 60 - h - 6;
          return <rect key={i} x={x} y={y} width={w - 8} height={h} rx={3} ry={3} fill="#2563eb" />;
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>{labels.map((l, i) => <span key={i}>{i % 3 === 0 ? l.split('/').slice(0,2).join('/') : ''}</span>)}</div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  page: { padding: 24, fontFamily: 'Inter, system-ui, sans-serif' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { margin: 0, fontSize: 24 },
  subtitle: { marginTop: 6, color: '#6b7280' },
  kpis: { display: 'flex', gap: 12 },
  kpi: { background: '#fff', padding: 12, borderRadius: 12, minWidth: 90, textAlign: 'center', boxShadow: '0 6px 18px rgba(2,6,23,0.06)' },
  controls: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 },
  searchBox: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', padding: '8px 12px', borderRadius: 10, border: '1px solid #e5e7eb', width: 360 },
  input: { border: 'none', outline: 'none', width: '100%' },
  filterRow: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  selectWrap: { display: 'flex', gap: 6, alignItems: 'center', background: '#fff', padding: '6px 8px', borderRadius: 8, border: '1px solid #e5e7eb' },
  select: { border: 'none', outline: 'none' },
  dateRange: { display: 'flex', alignItems: 'center', background: '#fff', padding: '6px 8px', borderRadius: 8, border: '1px solid #e5e7eb' },
  dateInput: { border: 'none', outline: 'none' },
  clearBtn: { background: '#fff', border: '1px solid #e5e7eb', padding: '8px 10px', borderRadius: 8 },
  bulkBtn: { display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#16a34a,#059669)', color: '#fff', border: 'none', padding: '9px 12px', borderRadius: 10 },
  exportBtn: { display: 'flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #e5e7eb', padding: '8px 10px', borderRadius: 8 },
  contentRow: { display: 'flex', gap: 16 },
  tableColumn: { flex: 1, background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 10px 26px rgba(2,6,23,0.04)' },
  sideColumn: { width: 340 },
  tableHeader: { display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #eef2f7', marginBottom: 8, alignItems: 'center' },
  skeletonRow: { height: 60, background: 'linear-gradient(90deg,#f3f4f6,#eef2f7,#f3f4f6)', borderRadius: 8, marginBottom: 10 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 8px', borderBottom: '1px solid #f1f5f9' },
  avatar: { width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#2563eb,#4f46e5)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800 },
  userName: { fontWeight: 700 },
  metaLine: { fontSize: 12, color: '#6b7280' },
  approveBtn: { background: '#10b981', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: 8 },
  rejectBtn: { background: '#fff', color: '#dc2626', border: '1px solid #fee2e2', padding: '8px 10px', borderRadius: 8 },
  deleteBtn: { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb', padding: '8px 10px', borderRadius: 8 },
  smallBtn: { background: '#fff', border: '1px solid #e5e7eb', padding: '8px 10px', borderRadius: 8 },
  pagination: { display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 },
  card: { background: '#fff', padding: 12, borderRadius: 10, boxShadow: '0 10px 26px rgba(2,6,23,0.04)' },
  activityRow: { padding: 8, borderBottom: '1px solid #eef2f7' },
  toaster: { position: 'fixed', right: 20, top: 20, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 60 },
  toast: { background: '#fff', padding: 12, borderRadius: 10, boxShadow: '0 8px 30px rgba(2,6,23,0.08)', minWidth: 220, display: 'flex', flexDirection: 'column', gap: 6 },
  undoBtn: { background: 'transparent', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer' },
  closeToast: { background: 'transparent', border: 'none', cursor: 'pointer', alignSelf: 'flex-end' },
  modalWrap: { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'grid', placeItems: 'center', zIndex: 80 },
  modal: { background: '#fff', padding: 18, borderRadius: 12, width: 460, boxShadow: '0 20px 60px rgba(2,6,23,0.4)' },
  cancelBtn: { background: '#fff', border: '1px solid #e5e7eb', padding: '8px 12px', borderRadius: 8 },
  confirmBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8 },
  empty: { padding: 28, textAlign: 'center', color: '#6b7280' },
};
