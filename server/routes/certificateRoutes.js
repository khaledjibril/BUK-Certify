import express from "express";
import upload from "../config/multer.js";
import {
  uploadCertificate,
  listCertificates,
  revokeCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

router.get("/", listCertificates);
router.post("/", upload.single("certificate"), uploadCertificate);
router.patch("/:id/revoke", revokeCertificate);

export default router;