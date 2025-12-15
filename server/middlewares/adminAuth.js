const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No authorization token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = adminAuth;
