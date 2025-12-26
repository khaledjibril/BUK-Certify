import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  Mail,
  Loader2,
  RefreshCw,
} from "lucide-react";
import * as adminApi from "../../services/api";
import styles from "./HelpDesk.module.css";

const ITEMS_PER_PAGE = 8;

export default function AdminHelpdesk() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [activeTicket, setActiveTicket] = useState(null);
  const [reply, setReply] = useState("");

  const [toasts, setToasts] = useState([]);

  /* ================= FETCH ================= */
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getHelpdeskTickets();
      setTickets(data);
    } catch (err) {
      pushToast({ title: "Error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  /* ================= FILTERING ================= */
  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      if (
        search &&
        !t.name.toLowerCase().includes(search.toLowerCase()) &&
        !t.email.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [tickets, filterStatus, search]);

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

  /* ================= ACTION ================= */
  const closeTicket = async () => {
    if (!reply) {
      pushToast({
        title: "Validation",
        message: "Reply message is required",
      });
      return;
    }

    try {
      await adminApi.closeHelpdeskTicket(activeTicket.id, reply);
      pushToast({
        title: "Ticket Closed",
        message: `Reply sent to ${activeTicket.email}`,
      });
      setActiveTicket(null);
      setReply("");
      fetchTickets();
    } catch (err) {
      pushToast({ title: "Error", message: err.message });
    }
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <h1>Helpdesk Requests</h1>
        <div className={styles.kpis}>
          <div className={styles.kpi}>Total: {tickets.length}</div>
          <div className={styles.kpi}>
            Open: {tickets.filter((t) => t.status === "open").length}
          </div>
          <div className={styles.kpi}>
            Closed: {tickets.filter((t) => t.status === "closed").length}
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
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <button
          className={styles.refreshBtn}
          onClick={fetchTickets}
          disabled={loading}
        >
          <RefreshCw
            size={14}
            className={loading ? styles.spin : ""}
          />
          Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Name</div>
          <div>Email</div>
          <div>Category</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {loading ? (
          <div className={styles.loaderWrap}>
            <Loader2 size={36} className={styles.spin} />
            <span>Loading tickets…</span>
          </div>
        ) : pageData.length === 0 ? (
          <div className={styles.empty}>No tickets found.</div>
        ) : (
          pageData.map((t) => (
            <div className={styles.row} key={t.id}>
              <div>{t.name}</div>
              <div>{t.email}</div>
              <div>{t.category}</div>
              <div className={`${styles.status} ${styles[t.status]}`}>
                {t.status}
              </div>
              <div className={styles.actions}>
                {t.status === "open" ? (
                  <button
                    className={styles.replyBtn}
                    onClick={() => setActiveTicket(t)}
                  >
                    <Mail size={14} />
                  </button>
                ) : (
                  <CheckCircle size={16} className={styles.closedIcon} />
                )}
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

      {/* MODAL */}
      {activeTicket && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Reply to {activeTicket.email}</h3>

            <textarea
              placeholder="Type your response..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button onClick={closeTicket} className={styles.submitBtn}>
                Send & Close
              </button>
              <button
                onClick={() => setActiveTicket(null)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
