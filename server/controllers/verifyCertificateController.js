import * as UVC from "../models/uvcTokenModel.js";
import * as Cert from "../models/certificateModel.js";
import * as Audit from "../models/verificationLogModel.js";

import path from "path";
import fs from "fs";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
export const verifyCertificate = async (req, res) => {
  try {
    const { uvc, certificateNumber } = req.body;
console.log("VERIFY PAYLOAD:", req.body);

    if (!uvc || !certificateNumber) {
      return res.status(400).json({
        message: "UVC AND CERTIFICATE NUMBER ARE REQUIRED",
      });
    }

    // 1️⃣ Validate UVC
    const token = await UVC.findActiveUvc(uvc);
    if (!token) {
      return res.status(403).json({
        message: "INVALID OR EXHAUSTED UVC",
      });
    }

    if (token.used_count >= token.total_limit) {
      await UVC.exhaustIfNeeded(token.id);
      return res.status(403).json({
        message: "SEARCH LIMIT EXHAUSTED",
      });
    }

    // 2️⃣ Find certificate
    const cert = await Cert.findByCertificateNumber(certificateNumber);
console.log("CERT QUERY RESULT:", cert);

    let result = "NOT_FOUND";

    if (cert) {
      result = cert.status === "ACTIVE" ? "FOUND" : "REVOKED";
    }

    // 3️⃣ Log verification
    await Audit.logVerification({
      verifierId: token.verifier_id,
      uvcCode: uvc,
      certNo: certificateNumber,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      result,
    });

    // 4️⃣ Increment usage
    await UVC.incrementUsage(token.id);
    await UVC.exhaustIfNeeded(token.id);

    const remaining =
      token.total_limit - (token.used_count + 1);

    // 5️⃣ Respond
    return res.json({
      certificate: cert
        ? {
            studentName: cert.student_name,
            regNumber: cert.reg_number,
            course: cert.course,
            issueDate: cert.issue_date,
            graduationYear:cert.graduation_year,
            certificateImageUrl: cert.certificate_image_url
          ? `${BASE_URL}${cert.certificate_image_url}`
          : null,
          verificationHash: cert.verification_hash,
            grade: cert.grade_type,
            gradeValue: cert.grade_value,
            status: cert.status, 
          }
        : null,
      remaining,
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ message: "SERVER ERROR" });
  }
};
export const resolveVerificationToken = async (req, res) => {
  const { token } = req.params;

  const cert = await Cert.findByVerificationToken(token);

  if (!cert) {
    return res.status(404).json({
      message: "INVALID VERIFICATION TOKEN",
    });
  }

  return res.json({
    certificateNumber: cert.certificate_number,
  });
};

export const downloadCertificateImage = async (req, res) => {
  try {
    const { hash } = req.params;

    if (!hash) {
      return res.status(400).json({ message: "INVALID TOKEN" });
    }

    const cert = await Cert.findByVerificationToken(hash);

    if (!cert || !cert.certificate_image_url) {
      return res.status(404).json({ message: "FILE NOT FOUND" });
    }

    // Normalize path (Windows safe)
    const relativePath = cert.certificate_image_url.replace(/\\/g, "/");
    const filePath = path.join(process.cwd(), relativePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "FILE NOT FOUND ON SERVER" });
    }

    res.download(
      filePath,
      `certificate-${cert.reg_number}.png`
    );
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    res.status(500).json({ message: "DOWNLOAD FAILED" });
  }
};