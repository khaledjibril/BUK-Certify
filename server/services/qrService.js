import QRCode from "qrcode";
import fs from "fs";
import path from "path";

const QR_DIR = "uploads/qr";

// ✅ Ensure directory exists
if (!fs.existsSync(QR_DIR)) {
  fs.mkdirSync(QR_DIR, { recursive: true });
}

export const generateQR = async (url, filename) => {
  const filePath = path.join(QR_DIR, filename);

  await QRCode.toFile(filePath, url);

  return filePath;
};
