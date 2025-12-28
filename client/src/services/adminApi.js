import axios from "axios";

const API = axios.create({ baseURL: "https://buk-certify-backend.onrender.com/admin" });

export const getUsers = async () => {
  const res = await API.get("/verifiers");
  return res.data;
};

export const updateUserStatus = async (id, status) => {
  if (status === "approved") {
    const res = await API.post(`/verifiers/${id}/approve`);
    return res.data;
  }

  if (status === "rejected") {
    const res = await API.post(`/verifiers/${id}/reject`);
    return res.data;
  }

  if (status === "deleted") {
    const res = await API.delete(`/verifiers/${id}`);
    return res.data;
  }

  throw new Error("Invalid status");
};

export const bulkApproveUsers = async (ids) => {
  const res = await API.post("/verifiers/bulk-approve", { ids });
  return res.data;
};
// Export CSV
export const exportCSV = (users) => {
  const headers = ["Full Name", "Email", "Phone", "Role", "Status"];
  const rows = users.map(u =>
    [u.full_name, u.email, u.phone, u.role, u.status].join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "verifiers.csv";
  link.click();

  URL.revokeObjectURL(url);
};
// Export PDF (simple print)
export const exportPDF = () => {
  window.print();
};
