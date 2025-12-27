import pool from "../config/db.js";

export const logVerification = async ({
  verifierId,
  uvcCode,
  certNo,
  ip,
  userAgent,
  result,
}) => {
  await pool.query(
    `INSERT INTO verification_logs
     (verifier_id, uvc_code, certificate_number, ip_address, user_agent, result)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [verifierId, uvcCode, certNo, ip, userAgent, result]
  );
};
