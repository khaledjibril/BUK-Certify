import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 CONNECT TO SESSION

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://buk-certify-backend.onrender.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ STORE TOKEN VIA AUTH CONTEXT
      login({ token: data.token });

      // ✅ REDIRECT
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Server error");
    }

    setLoading(false);
  };

  return (
    <div className="Admin">
      <Navbar />

      <section className="buk-card" style={{ margin: "48px auto", maxWidth: 400 }}>
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit} className="buk-form">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="buk-input"
            required
          />

          <button className="buk-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <div className="buk-result error">{error}</div>}
      </section>

      <Footer />
    </div>
  );
}

export default AdminLogin;
