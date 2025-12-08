// src/pages/Verifier/Settings.jsx
import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Settings() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Verifier Settings
      </h1>

      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Change Password
            </label>
            <input
              type="password"
              placeholder="New password"
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            />
            <div style={{ marginTop: 10 }}>
              <Button>Update Password</Button>
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Email Notifications
            </label>
            <select
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            >
              <option>All notifications</option>
              <option>Only important alerts</option>
              <option>None</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
              Theme
            </label>
            <p>Use sidebar toggle for light/dark mode</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
