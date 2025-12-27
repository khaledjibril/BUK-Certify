import express from "express";
import { verifyCertificate,resolveVerificationToken, downloadCertificateImage } from "../controllers/verifyCertificateController.js";

const router = express.Router();

router.post("/verify", verifyCertificate);
router.get("/resolve/:token", resolveVerificationToken);
router.get("/download/:hash", downloadCertificateImage);

export default router;
