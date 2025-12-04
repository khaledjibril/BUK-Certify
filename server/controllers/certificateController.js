import pool from '../models/db.js';

export const addCertificate = async (req, res) => {
  const { student_id, certificate_no, degree, cgpa, issued_date } = req.body;
  try {
    const cert = await pool.query(
      `INSERT INTO certificates (student_id, certificate_no, degree, cgpa, issued_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [student_id, certificate_no, degree, cgpa, issued_date]
    );
    res.json(cert.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding certificate' });
  }
};

export const verifyCertificate = async (req, res) => {
  const { certificate_no } = req.params;
  try {
    const cert = await pool.query(
      `UPDATE certificates SET verified = true WHERE certificate_no = $1 RETURNING *`,
      [certificate_no]
    );
    res.json(cert.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};
