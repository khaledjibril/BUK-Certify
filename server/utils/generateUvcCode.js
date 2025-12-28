// utils/generateUvcCode.js
export const generateUvcCode = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BUK-UVC-${random}`;
};
