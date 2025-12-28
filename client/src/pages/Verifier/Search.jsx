import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import styles from "./Search.module.css";
import { verifierApi } from "../../services/verifierApi";

export default function Search() {
  const [uvc, setUvc] = useState("");
  const [certNo, setCertNo] = useState("");

  const [result, setResult] = useState(null);
  const [remaining, setRemaining] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [expanded, setExpanded] = useState(false);

  const handleSearch = async () => {
    if (!uvc || !certNo) {
      setError("UVC AND CERTIFICATE NUMBER ARE REQUIRED");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setExpanded(false);

    try {
      const res = await verifierApi.verifyCertificate({
        uvc: uvc.toUpperCase(),
        certificateNumber: certNo.trim(),
      });

      if (!res.certificate) {
        setError("CERTIFICATE NOT FOUND");
      } else {
        setResult(res.certificate);
      }

      setRemaining(res.remaining);
    } catch (err) {
      setError(
        err.response?.data?.message || "VERIFICATION FAILED"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Certificate Verification</h1>

      {/* SEARCH FORM */}
      <div className={styles.card}>
        <input
          placeholder="ENTER UVC CODE"
          value={uvc}
          onChange={(e) => setUvc(e.target.value)}
        />

        <input
          placeholder="CERTIFICATE / REG NUMBER"
          value={certNo}
          onChange={(e) => setCertNo(e.target.value)}
        />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? <Loader2 className={styles.spin} /> : "VERIFY"}
        </button>

        {remaining !== null && (
          <p className={styles.remaining}>
            REMAINING SEARCHES: <strong>{remaining}</strong>
          </p>
        )}
      </div>

      {/* ERROR */}
      {error && <div className={styles.error}>{error}</div>}

      {/* RESULT TABLE */}
      {result && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Student Name</th>
                <th>Reg Number</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* MAIN ROW */}
              <tr>
                <td>
                  {result.status === "ACTIVE" ? (
                    <CheckCircle className={styles.valid} />
                  ) : (
                    <XCircle className={styles.invalid} />
                  )}
                </td>
                <td>{result.studentName}</td>
                <td>{result.regNumber}</td>
                <td>{result.course}</td>
                <td>
                  <button
                    className={styles.expandBtn}
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? (
                      <>
                        <ChevronUp size={16} /> Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} /> View More
                      </>
                    )}
                  </button>
                </td>
              </tr>

              {/* EXPANDED DETAILS ROW */}
              {expanded && (
                <tr className={styles.expandedRow}>
                  <td colSpan="5">
                    <div className={styles.detailsGrid}>
                      <div>
                        <p><strong>Graduation Year:</strong> {result.graduationYear}</p>
                        <p>
                          <strong>Issued On:</strong>{" "}
                          {new Date(result.issueDate).toDateString()}
                        </p>
                        <p><strong>Grade:</strong> {result.grade}</p>
                        <p><strong>Grade Value:</strong> {result.gradeValue}</p>
                        <p><strong>Status:</strong> {result.status}</p>
                      </div>

                      {result.certificateImageUrl && (
                        <div className={styles.certBox}>
                          <img
                            src={result.certificateImageUrl}
                            alt="Certificate"
                          />

                          <a
                                href={`http://buk-certify-backend.onrender.com/api/verifier/download/${result.verificationHash}`}
                                className={styles.downloadBtn}
                              >
                                <Download size={16} /> Download Certificate
                              </a>

                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* LIMIT EXHAUSTED */}
      {remaining === 0 && (
        <div className={styles.exhausted}>
          SEARCH LIMIT EXHAUSTED.
          <a href="/verifier/request-uvc"> REQUEST MORE ACCESS</a>
        </div>
      )}
    </div>
  );
}

