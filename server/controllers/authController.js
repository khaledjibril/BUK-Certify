import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';

const generateToken = (user, role) => {
  return jwt.sign(
    { id: user.id, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register Admin/Verifier
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const table = role === 'admin' ? 'admins' : 'verifiers';
    const user = await pool.query(
      `INSERT INTO ${table} (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, hashed]
    );
    res.json({ message: `${role} registered`, user: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login Admin/Verifier
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  const table = role === 'admin' ? 'admins' : 'verifiers';

  try {
    const result = await pool.query(`SELECT * FROM ${table} WHERE email=$1`, [email]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user, role);
    res.json({ token, user: { id: user.id, name: user.name, role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
