const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/userModel');
require('dotenv').config()

// Register API
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ where: { username } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create new admin
      const newAdmin = await Admin.create({
        username,
        password: hashedPassword,
      });
  
      return res.status(201).json({ message: 'Admin registered successfully', adminId: newAdmin.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
//admin login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ where: { username } });
  if (!admin) return res.status(401).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ adminId: admin.id }, process.env.SECRETE_KEY, { expiresIn: '1h' });
  return res.json({ token });
};
