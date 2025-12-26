import sharp from "sharp";
import path from "path";
import fs from "fs";

const FINAL_DIR = "uploads/certificates";

if (!fs.existsSync(FINAL_DIR)) {
  fs.mkdirSync(FINAL_DIR, { recursive: true });
}

export const mergeQR = async (certificatePath, qrPath, filename) => {
  const outputPath = path.join(FINAL_DIR, filename);

  await sharp(certificatePath)
    .composite([{ input: qrPath, gravity: "southeast" }])
    .toFile(outputPath);

  return outputPath.replace(/\\/g, "/"); // ✅ return usable URL path
};
