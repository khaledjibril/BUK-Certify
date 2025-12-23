import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { loginVerifier } from "../../services/api";
import { useAuth } from "../../context/AuthContext"; // <-- import context
import styles from "./VerifierLogin.module.css";

export default function VerifierLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // <-- use AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Call backend API
      const data = await loginVerifier(formData);

      // Update global auth context
      login({ token: data.token, role: "verifier", user: data.verifier });

      setMessage("Login successful! Redirecting...");

      // Redirect using react-router
      setTimeout(() => {
        navigate("/verifier/dashboard");
      }, 1000);
    } catch (error) {
      // Pending approval handling
      if (error.message?.toLowerCase().includes("pending approval")) {
        navigate("/pending-approval");
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
            <p className={styles.pstyle}>
              Access the secure certificate verification system
            </p>
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
                  message.toLowerCase().includes("successful")
                    ? styles.success
                    : styles.error
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

          <div className={styles.signup}>
            Don't have an account?{" "}
            <a href="/verifier-register">Register here</a>
          </div>

          <div className={styles.security}>
            <h4>Security Notice</h4>
            <p>
              Your login is encrypted and protected. Unauthorized access is
              monitored.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
