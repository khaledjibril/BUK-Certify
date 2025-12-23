const { createOrganization, createVerifier, Verifier } = require("../models/verifierModel");
const { hashPassword } = require("../utils/hashPassword");
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const registerVerifier = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      role,
      organizationName,
      orgType,
      orgDomain,
      address,
      termsAccepted,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    const org = await createOrganization({
      name: organizationName,
      type: orgType,
      domain: orgDomain,
      address,
    });

    const verifier = await createVerifier({
      full_name: fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      organization_id: org.id,
      reg_doc_path: req.files?.regDoc?.[0]?.path || null,
      auth_letter_path: req.files?.authLetter?.[0]?.path || null,
      terms_accepted: termsAccepted,
    });

    res.status(201).json({ message: "Registration successful!", verifier });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginVerifier = async (req, res) => {
  const { email, password } = req.body;

  try {
    const verifier = await Verifier.findByEmail(email);
    if (!verifier) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

        // Check if approved
    if (!verifier.is_approved) {
      return res.status(403).json({ message: 'Account pending approval' });
    }

    // 🔑 Password check
    const isMatch = await bcrypt.compare(password, verifier.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 🎟 Generate token (ONLY minimal data)
    const token = generateToken({
      id: verifier.id,
      role: "verifier"
    });

    // ✅ Consistent session response
    res.json({
      token,
      role: "verifier",
      user: {
        id: verifier.id,
        email: verifier.email,
        fullName: verifier.full_name
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { registerVerifier, loginVerifier };
