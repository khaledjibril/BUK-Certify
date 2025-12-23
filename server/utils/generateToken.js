const jwt = require("jsonwebtoken");

module.exports = (payload) => {
  return jwt.sign(
    payload, // { id, role }
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
