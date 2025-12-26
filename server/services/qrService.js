const QRCode = require( "qrcode");
const fs = require( "fs/promises");

export const generateQR = async (url, filePath) => {
  await QRCode.toFile(filePath, url);
};
