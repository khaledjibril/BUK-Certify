const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,     // 🔑 ROLE LIVES HERE
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
