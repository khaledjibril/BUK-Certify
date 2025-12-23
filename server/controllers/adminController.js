const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/token");

const loginAdmin = async (req, res) => {
  const { password } = req.body;

  try {
    const admin = await Admin.findAdmin();
    if (!admin) {
      return res.status(500).json({ error: "Admin not configured" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid" });
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: "admin"
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { loginAdmin };
