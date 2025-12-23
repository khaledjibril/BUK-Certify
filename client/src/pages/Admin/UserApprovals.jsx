import React, { useState, useEffect, useMemo } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Download,
  Loader2,
  RefreshCw,
} from "lucide-react";
import * as adminApi from "../../services/adminApi";
import styles from "./UserApprovals.module.css";

const ITEMS_PER_PAGE = 8;
const currentAdmin = { id: 999, name: "Admin User" };

export default function UserApprovals() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [toasts, setToasts] = useState([]);

  /* ================= FETCH / REFRESH ================= */
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

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= FILTERING ================= */
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

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  /* ================= TOASTS ================= */
  const pushToast = (t) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { id, ...t }]);
    setTimeout(() => removeToast(id), 6000);
  };

  const removeToast = (id) =>
    setToasts((s) => s.filter((t) => t.id !== id));

  /* ================= ACTIONS ================= */
  const applyAction = async (userId, action) => {
    const map = {
      approve: "approved",
      reject: "rejected",
      delete: "deleted",
    };

    try {
      await adminApi.updateUserStatus(
        userId,
        map[action],
        currentAdmin.name
      );
      pushToast({
        title: "Success",
        message: `User ${map[action]}`,
      });
      fetchUsers();
    } catch (err) {
      pushToast({ title: "Error", message: err.message });
    }
  };

  const bulkApprove = async () => {
    try {
      await adminApi.bulkApproveUsers(
        selected,
        currentAdmin.name
      );
      pushToast({
        title: "Bulk Approved",
        message: `${selected.length} users approved`,
      });
      setSelected([]);
      fetchUsers();
    } catch (err) {
      pushToast({ title: "Error", message: err.message });
    }
  };

  /* ================= SELECTION ================= */
  const toggleSelect = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const selectAllOnPage = () => {
    const ids = pageData.map((u) => u.id);
    const allSelected = ids.every((id) => selected.includes(id));
    setSelected((s) =>
      allSelected
        ? s.filter((id) => !ids.includes(id))
        : Array.from(new Set([...s, ...ids]))
    );
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h1>Pending User Approvals</h1>
        <div className={styles.kpis}>
          <div className={styles.kpi}>Total: {users.length}</div>
          <div className={styles.kpi}>
            Pending: {users.filter((u) => u.status === "pending").length}
          </div>
          <div className={styles.kpi}>
            Approved: {users.filter((u) => u.status === "approved").length}
          </div>
          <div className={styles.kpi}>
            Rejected: {users.filter((u) => u.status === "rejected").length}
          </div>
          <div className={styles.kpi}>
            Deleted: {users.filter((u) => u.status === "deleted").length}
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.select}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="deleted">Deleted</option>
        </select>

        <button
          className={styles.refreshBtn}
          onClick={fetchUsers}
          disabled={loading}
        >
          <RefreshCw
            size={14}
            className={loading ? styles.spin : ""}
          />
          Refresh
        </button>

        <button
          className={styles.bulkBtn}
          disabled={!selected.length}
          onClick={bulkApprove}
        >
          <CheckCircle size={14} /> Bulk Approve ({selected.length})
        </button>

        <button
          className={styles.exportBtn}
          onClick={() => adminApi.exportCSV(users)}
        >
          <Download size={14} /> CSV
        </button>

        <button
          className={styles.exportBtn}
          onClick={adminApi.exportPDF}
        >
          <Download size={14} /> Print
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <input
            type="checkbox"
            onChange={selectAllOnPage}
            checked={
              pageData.length &&
              pageData.every((u) => selected.includes(u.id))
            }
          />
          <div>Full Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Role</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div className={styles.loaderWrap}>
            <Loader2 size={36} className={styles.spin} />
            <span>Fetching users…</span>
          </div>
        ) : pageData.length === 0 ? (
          <div className={styles.empty}>No users found.</div>
        ) : (
          pageData.map((u) => (
            <div className={styles.row} key={u.id}>
              <input
                type="checkbox"
                checked={selected.includes(u.id)}
                onChange={() => toggleSelect(u.id)}
              />
              <div>{u.full_name}</div>
              <div>{u.email}</div>
              <div>{u.phone}</div>
              <div>{u.role}</div>
              <div className={`${styles.status} ${styles[u.status]}`}>
                {u.status}
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.approveBtn}
                  onClick={() => applyAction(u.id, "approve")}
                >
                  <CheckCircle size={14} />
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => applyAction(u.id, "reject")}
                >
                  <XCircle size={14} />
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => applyAction(u.id, "delete")}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>◀</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>▶</button>
      </div>

      {/* TOASTS */}
      <div className={styles.toaster}>
        {toasts.map((t) => (
          <div key={t.id} className={styles.toast}>
            <strong>{t.title}</strong>
            <span>{t.message}</span>
            <button onClick={() => removeToast(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
