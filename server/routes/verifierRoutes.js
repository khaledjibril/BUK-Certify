const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const middleware = require("../middlewares/authMiddleware");
const {loginVerifier, registerVerifier } = require("../controllers/verifierController");

// File fields for multer
const cpUpload = upload.fields([
  { name: "regDoc", maxCount: 1 },
  { name: "authLetter", maxCount: 1 },
]);
router.post("/login", loginVerifier);
router.post("/register", cpUpload, registerVerifier);

module.exports = router;
