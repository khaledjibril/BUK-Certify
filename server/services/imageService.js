const sharp = require( "sharp");

export const mergeQR = async (certPath, qrPath, outputPath) => {
  await sharp(certPath)
    .composite([{ input: qrPath, gravity: "southeast" }])
    .toFile(outputPath);
};
