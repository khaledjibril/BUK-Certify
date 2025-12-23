const jwt = require("jsonwebtoken");

/**
 * 🔐 Protect routes (any logged-in user)
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized, no token"
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { id, role, iat, exp }
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, token invalid"
    });
  }
};

/**
 * 🛑 Admin only
 */
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admins only"
    });
  }
  next();
};

/**
 * 🛑 Verifier only
 */
const verifierOnly = (req, res, next) => {
  if (req.user.role !== "verifier") {
    return res.status(403).json({
      message: "Verifiers only"
    });
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
  verifierOnly
};
