-- Admin table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verifier table
CREATE TABLE verifiers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150),
  matric_no VARCHAR(50) UNIQUE,
  department VARCHAR(100),
  faculty VARCHAR(100),
  graduation_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates table
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  certificate_no VARCHAR(100) UNIQUE NOT NULL,
  degree VARCHAR(100),
  cgpa DECIMAL(3,2),
  issued_date DATE,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verification logs
CREATE TABLE verification_logs (
  id SERIAL PRIMARY KEY,
  verifier_id INT REFERENCES verifiers(id) ON DELETE SET NULL,
  certificate_id INT REFERENCES certificates(id) ON DELETE CASCADE,
  action VARCHAR(50),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
