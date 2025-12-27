import pool from "../config/db.js";

export const Certificate = {
  create: async (data) => {
    const q = `
      INSERT INTO certificates (
        student_name,
        reg_number,
        course,
        graduation_year,
        issue_date,
        certificate_number,
        grade_type,
        grade_value,
        certificate_image_url,
        qr_code_url,
        verification_hash,
        verification_url
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,$11,$12
      )
      RETURNING *;
    `;

    const values = [
      data.student_name,
      data.reg_number,
      data.course,
      data.graduation_year,
      data.issue_date,
      data.certificate_number,
      data.grade_type,
      data.grade_value,
      data.certificate_image_url,
      data.qr_code_url,
      data.verification_hash,
      data.verification_url,
    ];

    const { rows } = await pool.query(q, values);
    return rows[0];
  },

list: async () => {
  const { rows } = await pool.query(
    "SELECT * FROM certificates ORDER BY created_at DESC"
  );

  return rows.map((r) => ({
    id: r.id,
    studentName: r.student_name,
    regNumber: r.reg_number,
    course: r.course,
    graduationYear: r.graduation_year,
    issueDate: r.issue_date,
    certificateNumber: r.certificate_number,
    gradeType: r.grade_type,
    gradeValue: r.grade_value,
    status: r.status,
    certificateImageUrl: r.certificate_image_url,
    qrCodeUrl: r.qr_code_url,
    verificationUrl: r.verification_url,
    createdAt: r.created_at,
  }));
},


  revoke: async (id) => {
    await pool.query(
      "UPDATE certificates SET status='REVOKED' WHERE id=$1",
      [id]
    );
  },
};

export const findByCertificateNumber = async (input) => {
  const normalize = (v) =>
    v
      .replace(/\s+/g, "")   // remove all spaces
      .replace(/\./g, "/")   // dots → slashes
      .toUpperCase();

  const value = normalize(input);

  const { rows } = await pool.query(
    `
    SELECT *
    FROM certificates
    WHERE
      REPLACE(UPPER(certificate_number), ' ', '') = $1
      OR
      REPLACE(UPPER(reg_number), ' ', '') = $1
    LIMIT 1
    `,
    [value]
  );

  return rows[0] || null;
};
export const findByVerificationToken = async (token) => {
  const { rows } = await pool.query(
    `
    SELECT
      reg_number,
      certificate_image_url
    FROM certificates
    WHERE verification_hash = $1
    LIMIT 1
    `,
    [token]
  );

  return rows[0] || null;
};
