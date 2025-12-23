const express = require("express");
const router = express.Router();

const auth = require("../middlewares/adminMiddleware");
const role = require("../middlewares/roleMiddleware");
const { loginAdmin } = require("../controllers/adminController");

/* ================= PUBLIC ================= */
router.post("/", loginAdmin);

/* ================= PROTECTED ================= */
router.get(
  "/stats",
  auth,            // 🔐 verifies JWT
  role("admin"),   // 👮 ensures admin role
  (req, res) => {
    res.json({
      message: "Admin stats",
      admin: req.user   // { id, role, email }
    });
  }
);

module.exports = router;
