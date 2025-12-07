import React, { useState } from "react";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");

  // Fake QR generator (replace with real API later)
  const generateQR = () => {
    return `QR-${Math.floor(Math.random() * 1000000)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !studentName || !regNumber || !course) {
      alert("Please fill all fields!");
      return;
    }

    const newCert = {
      id: Date.now(),
      studentName,
      regNumber,
      course,
      file,
      qrCode: generateQR(),
      status: "Active",
      uploadedAt: new Date().toLocaleDateString(),
    };

    setCertificates([newCert, ...certificates]);

    // Reset form
    setFile(null);
    setStudentName("");
    setRegNumber("");
    setCourse("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this certificate?")) {
      setCertificates(certificates.filter((c) => c.id !== id));
    }
  };

  const filteredCerts = certificates.filter((c) =>
    c.studentName.toLowerCase().includes(search.toLowerCase()) ||
    c.regNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>🎓 Certificate Management</h1>

      {/* Upload Section */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 14,
          marginBottom: 24,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ marginBottom: 16 }}>Upload New Certificate</h3>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <input
            type="text"
            placeholder="Student Full Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            style={input}
          />

          <input
            type="text"
            placeholder="Registration Number"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            required
            style={input}
          />

          <input
            type="text"
            placeholder="Course / Program"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            style={input}
          />

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" style={btn}>
            Upload Certificate
          </button>
        </form>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or reg number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...input, marginBottom: 14 }}
      />

      {/* Certificate Table */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 14,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <table width="100%" border="0" cellPadding="10">
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th>Student</th>
              <th>Reg No</th>
              <th>Course</th>
              <th>QR Code</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCerts.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                  No certificates uploaded yet.
                </td>
              </tr>
            )}

            {filteredCerts.map((cert) => (
              <tr key={cert.id}>
                <td>{cert.studentName}</td>
                <td>{cert.regNumber}</td>
                <td>{cert.course}</td>
                <td>
                  <span style={qrBadge}>{cert.qrCode}</span>
                </td>
                <td>
                  <span
                    style={{
                      ...status,
                      background:
                        cert.status === "Active" ? "#d1fae5" : "#fee2e2",
                      color:
                        cert.status === "Active" ? "#065f46" : "#991b1b",
                    }}
                  >
                    {cert.status}
                  </span>
                </td>
                <td>{cert.uploadedAt}</td>
                <td>
                  <button style={smallBtn}>Download</button>
                  <button
                    style={{ ...smallBtn, background: "#ef4444" }}
                    onClick={() => handleDelete(cert.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const input = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  width: "100%",
  outline: "none",
};

const btn = {
  padding: "12px",
  borderRadius: 10,
  background: "#0b6ef6",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

const smallBtn = {
  padding: "6px 10px",
  borderRadius: 6,
  background: "#0b6ef6",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  marginRight: 6,
  fontSize: 12,
};

const qrBadge = {
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "6px 10px",
  borderRadius: 20,
  fontSize: 12,
};

const status = {
  padding: "6px 10px",
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 600,
};
