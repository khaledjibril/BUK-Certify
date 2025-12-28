const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminVerifierController");

router.get("/verifiers", adminController.getVerifiers);

router.post("/verifiers/:id/approve", adminController.approveVerify);
router.post("/verifiers/:id/reject", adminController.rejectVerifier);
router.delete("/verifiers/:id", adminController.deleteVerifier);

router.post("/verifiers/bulk-approve", adminController.bulkApproveVerifiers);

module.exports = router;
