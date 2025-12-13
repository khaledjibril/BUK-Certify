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


module.exports = { createOrganization, createVerifier, Verifier};
