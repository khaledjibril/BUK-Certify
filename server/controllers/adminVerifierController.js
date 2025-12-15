const Verifier = require("../models/userModel");

exports.getVerifiers = async (req, res) => {
  try {
    const verifiers = await Verifier.getAll();
    res.json(verifiers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch verifiers" });
  }
};

exports.approveVerifier = async (req, res) => {
  try {
    const verifier = await Verifier.approve(req.params.id);
    res.json(verifier);
  } catch {
    res.status(500).json({ message: "Approval failed" });
  }
};

exports.rejectVerifier = async (req, res) => {
  try {
    const verifier = await Verifier.reject(req.params.id);
    res.json(verifier);
  } catch {
    res.status(500).json({ message: "Rejection failed" });
  }
};

exports.deleteVerifier = async (req, res) => {
  try {
    const verifier = await Verifier.softDelete(req.params.id);
    res.json(verifier);
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.bulkApproveVerifiers = async (req, res) => {
  try {
    const verifiers = await Verifier.bulkApprove(req.body.ids);
    res.json(verifiers);
  } catch {
    res.status(500).json({ message: "Bulk approval failed" });
  }
};
