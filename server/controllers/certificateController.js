import crypto from "crypto";
import { Certificate } from "../models/certificateModel.js";
import { generateQR } from "../services/qrService.js";
import { mergeQR } from "../services/imageService.js";
import { generateCertNumber } from "../utils/certNumber.js";

export const uploadCertificate = async (req, res) => {
  const {
    studentName,
    regNumber,
    course,
    graduationYear,
    issueDate,
    gradeType,
    gradeValue,
  } = req.body;

  const hash = crypto.randomBytes(16).toString("hex");

  const verificationUrl = `${process.env.FRONTEND_URL}/verifier/dashboard/search/${hash}`;

  // filenames only
  const qrFilename = `${hash}.png`;
  const finalFilename = `final-${hash}.png`;

  // generate assets
  const qrPath = await generateQR(verificationUrl, qrFilename);
  const finalPath = await mergeQR(req.file.path, qrPath, finalFilename);

  const certificate = await Certificate.create({
    student_name: studentName,
    reg_number: regNumber,
    course,
    graduation_year: graduationYear,
    issue_date: issueDate,
    certificate_number: generateCertNumber(course, graduationYear),
    grade_type: gradeType,
    grade_value: gradeValue,

    certificate_image_url: `/${finalPath}`,
    qr_code_url: `/${qrPath}`,
    verification_hash: hash,
    verification_url: verificationUrl, // ✅ FIXED
  });

  res.status(201).json({ certificate });
};

export const listCertificates = async (_, res) => {
  const data = await Certificate.list();
  res.json(data);
};

export const revokeCertificate = async (req, res) => {
  await Certificate.revoke(req.params.id);
  res.json({ success: true });
};
