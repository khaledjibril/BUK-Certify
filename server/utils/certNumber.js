export const generateCertNumber = (course, year) => {
  const seq = Math.floor(100000 + Math.random() * 900000);
  return `BUK/${course}/${year}/${seq}`;
};
