// VerifierLogin.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { loginVerifier } from "../../services/api";
import styles from "./VerifierLogin.module.css";

export default function VerifierLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await loginVerifier(formData);
      localStorage.setItem("verifier_token", data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/verifier/dashboard";
      }, 1500);
    } catch (error) {
  if (error.message.includes("pending approval")) {
    window.location.href = "/pending-approval";
  } else {
    setMessage(error.message || "Login failed");
  }
}

    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logoBox}>
              <img
                src="/images/buklogo.webp"
                alt="BUK Logo"
                className={styles.logo}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className={styles.logoFallback}>
                <span>BUK</span>
              </div>
            </div>
            <h1 className={styles.h1style}>Verifier Login</h1>
            <p className={styles.pstyle}>Access the secure certificate verification system</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@organization.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            {message && (
              <p
                className={`${styles.message} ${
                  message.includes("successful") ? styles.success : styles.error
                }`}
              >
                {message}
              </p>
            )}

            <button type="submit" disabled={loading} className={styles.button}>
              {loading && <span className={styles.loader}></span>}
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          <div className={styles.signup}>Don't have an account? <a href="/verifier-register">Register here</a></div>

          <div className={styles.security}>
            <h4>Security Notice</h4>
            <p>Your login is encrypted and protected. Unauthorized access is monitored.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
