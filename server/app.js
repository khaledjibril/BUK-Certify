import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes (DEFAULT imports — important!)
import verifierRoutes from "./routes/verifierRoutes.js";
import adminVerifierRoutes from "./routes/adminVerifierRoutes.js";
import helpdeskRoutes from "./routes/helpdeskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/verifiers", verifierRoutes);
app.use("/admin/login", adminRoutes);
app.use("/api/helpdesk", helpdeskRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/admin", adminVerifierRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

export default app;
