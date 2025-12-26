import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./HelpDesk.module.css";
import { submitHelpDeskTicket } from "../../services/api";

export default function HelpDesk() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!form.name || !form.email || !form.category || !form.message) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      await submitHelpDeskTicket(form);

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        category: "",
        message: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Help Desk & Support</h1>
            <p>Need help? Reach out to the support team.</p>
          </header>

          <div className={styles.card}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Issue Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="account">Account/Login Issues</option>
                  <option value="verification">Verification Problem</option>
                  <option value="technical">Technical Error</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Describe Your Issue</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what problem you're facing..."
                />
              </div>

              {error && <p className={styles.errorMsg}>❌ {error}</p>}

              <button
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>

              {submitted && (
                <p className={styles.successMsg}>
                  ✅ Your support request has been received!  
                  Our team will reach out shortly.
                </p>
              )}
            </form>

            <div className={styles.contactBox}>
              <h3>Need Quick Assistance?</h3>
              <p>Email: support@buk.edu.ng</p>
              <p>Hotline: +234 800 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
