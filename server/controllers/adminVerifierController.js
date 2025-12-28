const pool = require("../config/db");
const Verifier = require("../models/userModel");
const { generateUvcCode } = require("../utils/generateUvcCode");
const { sendUvcEmail } = require("../utils/sendUvcEmail");

/* ================= GET ALL VERIFIERS ================= */
exports.getVerifiers = async (req, res) => {
  try {
    const verifiers = await Verifier.getAll();
    res.json(verifiers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch verifiers" });
  }
};

/* ================= APPROVE VERIFIER ================= */

exports.approveVerifier = async (req, res) => {
  const client = await pool.connect();

  try {
    const verifierId = req.params.id;

    await client.query("BEGIN");

    // 1. Approve verifier (prevent double approval)
    const verifierRes = await client.query(
      `UPDATE verifiers
       SET status = 'approved'
       WHERE id = $1 AND status != 'approved'
       RETURNING id, email, full_name`,
      [verifierId]
    );

    if (!verifierRes.rows.length) {
      await client.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "Verifier already approved or not found" });
    }

    const verifier = verifierRes.rows[0];

    // 2. Generate UNIQUE UVC
    let uvcCode;
    let exists = true;

    while (exists) {
      uvcCode = generateUvcCode();
      const check = await client.query(
        "SELECT 1 FROM uvc_tokens WHERE uvc_code = $1",
        [uvcCode]
      );
      exists = check.rows.length > 0;
    }

    // 3. Insert UVC (approved_by = NULL)
    await client.query(
      `INSERT INTO uvc_tokens
      (verifier_id, uvc_code, total_limit, used_count, created_at)
      VALUES ($1, $2, 10, 0, NOW())`,
      [verifier.id, uvcCode]
    );

    await client.query("COMMIT");

    // 4. Send email
    await sendUvcEmail(verifier.email, verifier.full_name, uvcCode);

    res.json({
      message: "Verifier approved successfully",
      uvc_code: uvcCode
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  } finally {
    client.release();
  }
};
/* ================= REJECT VERIFIER ================= */
exports.rejectVerifier = async (req, res) => {
  try {
    const verifier = await Verifier.reject(req.params.id);
    res.json(verifier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rejection failed" });
  }
};

/* ================= SOFT DELETE VERIFIER ================= */
exports.deleteVerifier = async (req, res) => {
  try {
    const verifier = await Verifier.softDelete(req.params.id);
    res.json(verifier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ================= BULK APPROVE (BASIC) ================= */
exports.bulkApproveVerifiers = async (req, res) => {
  try {
    const verifiers = await Verifier.bulkApprove(req.body.ids);
    res.json(verifiers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bulk approval failed" });
  }
};
