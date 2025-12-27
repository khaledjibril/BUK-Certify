import pool from "../config/db.js";

export const findActiveUvc = async (uvcCode) => {
  const { rows } = await pool.query(
    `SELECT * FROM uvc_tokens
     WHERE uvc_code = $1 AND status = 'ACTIVE'`,
    [uvcCode]
  );
  return rows[0];
};

export const incrementUsage = async (id) => {
  await pool.query(
    `UPDATE uvc_tokens
     SET used_count = used_count + 1
     WHERE id = $1`,
    [id]
  );
};

export const exhaustIfNeeded = async (id) => {
  await pool.query(
    `UPDATE uvc_tokens
     SET status = 'EXHAUSTED'
     WHERE used_count >= total_limit AND id = $1`,
    [id]
  );
};
