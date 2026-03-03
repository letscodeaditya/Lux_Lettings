import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const router = express.Router();

// WARNING: REMOVE AFTER FIRST USE
router.post('/create-temp-admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      email,
      password: hashed,
    });

    res.json({
      success: true,
      message: 'Temporary admin created successfully!',
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
