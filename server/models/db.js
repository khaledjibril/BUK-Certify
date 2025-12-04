import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // important for Render
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL on Render'))
  .catch(err => console.error('❌ DB connection error:', err));

export default pool;
