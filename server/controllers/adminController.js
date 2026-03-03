import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide both email and password' });
  }

  try {
    // 1. CHECK IF ADMIN EXISTS
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. CHECK HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 3. CREATE JWT TOKEN
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: admin.email },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred during login',
      error: error.message,
    });
  }
};
