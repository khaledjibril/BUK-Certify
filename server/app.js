const express = require("express");
const app = express();
const verifierRoutes = require("./routes/verifierRoutes");
const adminVerifierRoutes = require("./routes/adminVerifierRoutes");
const helpdeskRoutes = require( "./routes/helpdeskRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/verifiers", verifierRoutes);
app.use('/admin/login', adminRoutes);
app.use("/api/helpdesk", helpdeskRoutes);
app.use('/admin', adminVerifierRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
