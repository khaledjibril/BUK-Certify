import axios from "axios";

/* ----------------------------------
   BASE API CONFIG (CRA SAFE)
----------------------------------- */
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

/* ----------------------------------
   AUTH HEADER (JWT)
----------------------------------- */
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------
   UVC REQUESTS
----------------------------------- */

// Get all UVC requests (PENDING / APPROVED / REJECTED)
export const getUvcRequests = async () => {
  const res = await API.get("/admin/uvc-requests");
  return res.data;
};

// Approve a UVC request
export const approveUvc = async (requestId) => {
  const res = await API.post(`/admin/uvc-requests/${requestId}/approve`);
  return res.data;
};

// Reject a UVC request
export const rejectUvc = async (requestId, adminNote = "") => {
  const res = await API.post(`/admin/uvc-requests/${requestId}/reject`, {
    adminNote,
  });
  return res.data;
};

/* ----------------------------------
   AUDIT LOGS
----------------------------------- */

// Get verification audit logs
export const getAuditLogs = async (params = {}) => {
  const res = await API.get("/admin/audit-logs", {
    params,
  });
  return res.data;
};

/* ----------------------------------
   VERIFIERS
----------------------------------- */

// Get all verifiers
export const getVerifiers = async () => {
  const res = await API.get("/admin/verifiers");
  return res.data;
};

// Revoke a verifier's UVC
export const revokeUvc = async (uvcId) => {
  const res = await API.post(`/admin/uvc/${uvcId}/revoke`);
  return res.data;
};

/* ----------------------------------
   CERTIFICATES
----------------------------------- */

// Get all certificates
export const getCertificates = async () => {
  const res = await API.get("/admin/certificates");
  return res.data;
};

// Revoke a certificate
export const revokeCertificate = async (certificateId) => {
  const res = await API.post(`/admin/certificates/${certificateId}/revoke`);
  return res.data;
};
