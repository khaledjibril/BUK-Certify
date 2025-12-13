const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (verifier) => {
  return jwt.sign(
    { id: verifier.id, email: verifier.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = generateToken;
