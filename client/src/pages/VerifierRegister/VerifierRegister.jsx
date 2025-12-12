import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { registerVerifier } from "../../services/api";
import styles from "./VerifierRegister.module.css";

const INITIAL_STATE = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "",
  organizationName: "",
  orgType: "",
  orgDomain: "",
  address: "",
  regDoc: null,
  authLetter: null,
  termsAccepted: false,
};

export default function VerifierRegister() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [upload, setUpload] = useState({ regDoc: 0, authLetter: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const e = {};
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;

    const requiredFields = [
      "fullName",
      "email",
      "role",
      "organizationName",
      "orgType",
      "orgDomain",
    ];
    requiredFields.forEach((key) => {
      if (!form[key]) e[key] = "This field is required";
    });

    if (form.email && !emailRegex.test(form.email))
      e.email = "Invalid email format";

    if (!form.password) e.password = "Password is required";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!form.termsAccepted)
      e.termsAccepted = "You must accept the terms";

    return e;
  };

  // ---------------- UPDATE HANDLERS ----------------
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox")
      return setForm((p) => ({ ...p, [name]: checked }));

    if (type === "file") {
      setForm((p) => ({ ...p, [name]: files[0] }));
      return setUpload((p) => ({ ...p, [name]: 0 }));
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    setMessage("");

    try {
      await registerVerifier(form, (file, progress) =>
        setUpload((p) => ({ ...p, [file]: progress }))
      );

      setSubmitted(true);
      setMessage("Registration successful! Check your email.");
      setForm(INITIAL_STATE);
      setUpload({ regDoc: 0, authLetter: 0 });
    } catch (err) {
      setMessage(err.message || "Network error. Please try again.");
    }

    setLoading(false);
  };

  // ==============================================================
  //                             UI
  // ==============================================================

  const USER_FIELDS = [
    { label: "Full Name", name: "fullName" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phone" },
  ];

  const FILE_FIELDS = [
    { name: "regDoc", label: "Registration Document" },
    { name: "authLetter", label: "Authorization Letter" },
  ];

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.logoWrap}>
              <img
                src="/images/buklogo.webp"
                alt="BUK Logo"
                className={styles.logo}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className={styles.logoFallback}>BUK</div>
            </div>

            <h1 className={styles.h1style}>BUK Certificate Verification</h1>
            <p className={styles.pstyle}>
              Register as an authorized verifier or institution admin
            </p>
          </header>

          <div className={styles.card}>
            <form onSubmit={handleSubmit} className={styles.form}>

              {/* -------- USER INFO -------- */}
              <div className={styles.grid}>
                {USER_FIELDS.map((f) => (
                  <div key={f.name} className={styles.formGroup}>
                    <label>{f.label}</label>
                    <input
                      type={f.type || "text"}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                    />
                    {errors[f.name] && (
                      <p className={styles.error}>{errors[f.name]}</p>
                    )}
                  </div>
                ))}

                {/* Role Selector */}
                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select name="role" value={form.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="verifier">Verifier</option>
                    <option value="institution-admin">Institution Admin</option>
                  </select>
                  {errors.role && (
                    <p className={styles.error}>{errors.role}</p>
                  )}
                </div>

                {/* Password Fields */}
                {["password", "confirmPassword"].map((name) => (
                  <div key={name} className={styles.formGroup}>
                    <label>
                      {name === "password"
                        ? "Password"
                        : "Confirm Password"}
                    </label>
                    <input
                      type="password"
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                    />
                    {errors[name] && (
                      <p className={styles.error}>{errors[name]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* -------- ORGANIZATION INFO -------- */}
              <section className={styles.section}>
                <div className={styles.formGroup}>
                  <label>Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={form.organizationName}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label>Organization Type</label>
                    <select
                      name="orgType"
                      value={form.orgType}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="university">University</option>
                      <option value="college">College</option>
                      <option value="employer">Employer</option>
                      <option value="government">Government Agency</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Official Domain</label>
                    <input
                      type="text"
                      name="orgDomain"
                      value={form.orgDomain}
                      onChange={handleChange}
                      placeholder="buk.edu.ng"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Physical Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                {/* -------- FILE UPLOADS -------- */}
                <div className={styles.grid}>
                  {FILE_FIELDS.map((f) => (
                    <div key={f.name} className={styles.formGroup}>
                      <label>{f.label}</label>

                      <label className={styles.fileInput}>
                        {form[f.name]?.name || "Choose file"}
                        <input
                          type="file"
                          name={f.name}
                          onChange={handleChange}
                        />
                      </label>

                      {upload[f.name] > 0 && (
                        <p className={styles.uploadProgress}>
                          Uploading: {upload[f.name]}%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* -------- TERMS -------- */}
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                />
                <label>I agree to the Terms of Use & Privacy Policy</label>
              </div>
              {errors.termsAccepted && (
                <p className={styles.error}>{errors.termsAccepted}</p>
              )}

              {/* -------- SUBMIT -------- */}
              <button className={styles.submitBtn} disabled={loading}>
                {loading && <span className={styles.loader} />}
                {loading ? "Processing..." : "Register as Verifier"}
              </button>

              {message && (
                <p
                  className={`${styles.message} ${
                    message.includes("successful")
                      ? styles.success
                      : styles.error
                  }`}
                >
                  {message}
                </p>
              )}

              {submitted && (
                <p className={styles.success}>
                  Registration submitted! Await admin approval.
                </p>
              )}
            </form>

            {/* -------- SIGN IN -------- */}
            <div className={styles.signin}>
              Already have an account?{" "}
              <a href="/verifier-login">Sign in here</a>
            </div>

            <div className={styles.security}>
              <h4>Secure Verification System</h4>
              <p>
                Your credentials are encrypted & protected. BUK maintains
                enterprise-grade data security standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
