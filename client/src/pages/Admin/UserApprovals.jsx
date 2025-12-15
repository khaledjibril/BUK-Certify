import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle, XCircle, Trash2, Download } from "lucide-react";
import * as adminApi from "../../services/adminApi";
import styles from "./UserApprovals.module.css"; // CSS Module

const ITEMS_PER_PAGE = 8;
const currentAdmin = { id: 999, name: "Admin User" };

export default function UserApprovals() {
  // Loading & data
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // UI state
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await adminApi.getUsers();
        setUsers(data);
      } catch (err) {
        pushToast({ title: "Error", message: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filtered and paginated users
  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (filterStatus !== "all" && u.status !== filterStatus) return false;
      if (
        search &&
        !u.full_name.toLowerCase().includes(search.toLowerCase()) &&
        !u.email.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [users, filterStatus, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // Toast helpers
  const pushToast = (t) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { id, ...t }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 6000);
    return id;
  };
  const removeToast = (id) => setToasts((s) => s.filter((x) => x.id !== id));

  // Apply action (approve, reject, delete)
  const applyAction = async (userId, action) => {
    const statusMap = { approve: "approved", reject: "rejected", delete: "deleted" };
    const status = statusMap[action];
    try {
      const updatedUser = await adminApi.updateUserStatus(userId, status, currentAdmin.name);

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...updatedUser } : u))
      );

      pushToast({
        title: status.charAt(0).toUpperCase() + status.slice(1),
        message: `User ${status}`,
      });
    } catch (err) {
      pushToast({ title: "Error", message: err.message });
    }
  };

  // Bulk approve selected users
  const bulkApprove = async () => {
    try {
      const updatedUsers = await adminApi.bulkApproveUsers(selected, currentAdmin.name);
      setUsers((prev) =>
        prev.map((u) =>
          selected.includes(u.id) ? { ...u, ...updatedUsers.find((x) => x.id === u.id) } : u
        )
      );
      pushToast({ title: "Bulk Approved", message: `${selected.length} users approved` });
      setSelected([]);
    } catch (err) {
      pushToast({ title: "Error", message: err.message });
    }
  };

  // Selection helpers
  const toggleSelect = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const selectAllOnPage = () => {
    const ids = pageData.map((u) => u.id);
    const allSelected = ids.every((id) => selected.includes(id));
    if (allSelected) setSelected((s) => s.filter((id) => !ids.includes(id)));
    else setSelected((s) => Array.from(new Set([...s, ...ids])));
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerRow}>
        <h1>Pending User Approvals</h1>
        <div className={styles.kpis}>
          <div className={styles.kpi}>Total: {users.length}</div>
          <div className={styles.kpi}>Pending: {users.filter((u) => u.status === "pending").length}</div>
          <div className={styles.kpi}>Approved: {users.filter((u) => u.status === "approved").length}</div>
          <div className={styles.kpi}>Rejected: {users.filter((u) => u.status === "rejected").length}</div>
          <div className={styles.kpi}>Deleted: {users.filter((u) => u.status === "deleted").length}</div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={styles.select}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="deleted">Deleted</option>
        </select>
        <button onClick={bulkApprove} disabled={!selected.length} className={styles.bulkBtn}>
          <CheckCircle size={14} /> Bulk Approve ({selected.length})
        </button>
        <button onClick={() => adminApi.exportCSV(users)} className={styles.exportBtn}>
          <Download size={14} /> CSV
        </button>
        <button onClick={adminApi.exportPDF} className={styles.exportBtn}>
          <Download size={14} /> Print
        </button>
      </div>

      {/* User Table */}
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input type="checkbox" onChange={selectAllOnPage} checked={pageData.every((u) => selected.includes(u.id))} />
          <div>Full Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Role</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : pageData.length === 0 ? (
          <div>No users found.</div>
        ) : (
          pageData.map((u) => (
            <div className={styles.row} key={u.id}>
              <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} />
              <div>{u.full_name}</div>
              <div>{u.email}</div>
              <div>{u.phone}</div>
              <div>{u.role}</div>
              <div className={`${styles.status} ${styles[u.status]}`}>{u.status}</div>

              <div className={styles.actions}>
                <button onClick={() => applyAction(u.id, "approve")} className={styles.approveBtn}>
                  <CheckCircle size={14} /> Approve
                </button>
                <button onClick={() => applyAction(u.id, "reject")} className={styles.rejectBtn}>
                  <XCircle size={14} /> Reject
                </button>
                <button onClick={() => applyAction(u.id, "delete")} className={styles.deleteBtn}>
                  <Trash2 size={14} /> Delete
                </button>

                {u.reg_doc_path && (
                  <a href={u.reg_doc_path} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                    Reg Doc
                  </a>
                )}
                {u.auth_letter_path && (
                  <a href={u.auth_letter_path} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                    Auth Letter
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>◀</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>▶</button>
      </div>

      {/* Toasts */}
      <div className={styles.toaster}>
        {toasts.map((t) => (
          <div key={t.id} className={styles.toast}>
            <strong>{t.title}</strong>
            <div>{t.message}</div>
            <button onClick={() => removeToast(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
