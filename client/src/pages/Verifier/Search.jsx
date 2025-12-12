import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import styles from "./Search.module.css";

const mockCertificates = [
  { id: "BUK-2025-00121", name: "Muhammad Abdullahi", status: "VALID" },
  { id: "BUK-2025-00411", name: "Aisha Sadiq", status: "INVALID" },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const cert = mockCertificates.find(
      (c) => c.id === query || c.name.toLowerCase() === query.toLowerCase()
    );
    setResult(cert ? cert.status : "NOT FOUND");
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Search Certificates</h2>

      <div className={styles.searchCard}>
        <input
          placeholder="Enter Certificate ID or Name"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>

        {result && (
          <div
            className={
              result === "VALID"
                ? styles.resultValid
                : result === "INVALID"
                ? styles.resultInvalid
                : styles.resultNotFound
            }
          >
            {result === "VALID" ? (
              <CheckCircle size={20} />
            ) : result === "INVALID" ? (
              <XCircle size={20} />
            ) : null}
            <span>
              {result === "NOT FOUND" ? "Certificate not found" : `Certificate is ${result}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
