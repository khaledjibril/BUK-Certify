import pool from "../config/db.js";

export const Certificate = {
  create: async (data) => {
    const q = `
      INSERT INTO certificates (
        student_name, reg_number, course, graduation_year,
        issue_date, certificate_number,
        grade_type, grade_value,
        certificate_image_url, qr_code_url, verification_hash
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;
    const values = Object.values(data);
    const { rows } = await pool.query(q, values);
    return rows[0];
  },

  list: async () => {
    const { rows } = await pool.query(
      "SELECT * FROM certificates ORDER BY created_at DESC"
    );
    return rows;
  },
  revoke: async (id) => {
    await pool.query(
      "UPDATE certificates SET status='REVOKED' WHERE id=$1",
      [id]
    );
  },
};