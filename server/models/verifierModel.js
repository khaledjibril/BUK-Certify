const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const createOrganization = async ({ name, type, domain, address }) => {
  const res = await pool.query(
    "INSERT INTO organizations(name, type, domain, address) VALUES($1, $2, $3, $4) RETURNING id",
    [name, type, domain, address]
  );
  return res.rows[0];
};

const createVerifier = async (verifier) => {
  const {
    full_name,
    email,
    phone,
    password,
    role,
    organization_id,
    reg_doc_path,
    auth_letter_path,
    terms_accepted,
  } = verifier;

  const res = await pool.query(
    `INSERT INTO verifiers 
     (full_name, email, phone, password, role, organization_id, reg_doc_path, auth_letter_path, terms_accepted)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      full_name,
      email,
      phone,
      password,
      role,
      organization_id,
      reg_doc_path,
      auth_letter_path,
      terms_accepted,
    ]
  );
  return res.rows[0];
};

const Verifier = {

  findByEmail: async (email) => {
    const query = `SELECT * FROM verifiers WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
};
const getAllVerifiers = async (filters) => {
  const {
    status,
    search,
    role,
    limit = 10,
    offset = 0,
  } = filters;

  let query = `
    SELECT v.*, o.name AS organization_name
    FROM verifiers v
    JOIN organizations o ON o.id = v.organization_id
    WHERE 1=1
  `;
  const values = [];

  if (status && status !== "all") {
    values.push(status);
    query += ` AND v.status = $${values.length}`;
  }

  if (search) {
    values.push(`%${search.toLowerCase()}%`);
    query += ` AND (LOWER(v.full_name) LIKE $${values.length} OR LOWER(v.email) LIKE $${values.length})`;
  }

  values.push(limit, offset);
  query += ` ORDER BY v.created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const res = await pool.query(query, values);
  return res.rows;
};

exports.updateStatus = async (id, status, adminId) => {
  const res = await pool.query(
    `UPDATE verifiers
     SET status = $1,
         approved_by = $2,
         approved_at = CASE WHEN $1='approved' THEN NOW() ELSE approved_at END,
         rejected_at = CASE WHEN $1='rejected' THEN NOW() ELSE rejected_at END,
         deleted_at  = CASE WHEN $1='deleted'  THEN NOW() ELSE deleted_at END
     WHERE id = $3
     RETURNING *`,
    [status, adminId, id]
  );
  return res.rows[0];
};

exports.addHistory = async (verifierId, action, adminId) => {
  await pool.query(
    `INSERT INTO verifier_history (verifier_id, action, performed_by)
     VALUES ($1, $2, $3)`,
    [verifierId, action, adminId]
  );
};
exports.bulkUpdateStatus = async (ids, status, adminId) => {
  const query = `
    UPDATE verifiers
    SET status = $1,
        approved_by = $2,
        approved_at = CASE WHEN $1='approved' THEN NOW() ELSE approved_at END
    WHERE id = ANY($3::uuid[])
    RETURNING *;
  `;
  const res = await pool.query(query, [status, adminId, ids]);
  return res.rows;
};


module.exports = { createOrganization, createVerifier, Verifier, getAllVerifiers};
