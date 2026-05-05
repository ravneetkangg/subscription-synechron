const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Mock registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (for admin)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mock login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for root admin login
    if ((email === 'root' || req.body.name === 'root') && password === 'root') {
      let rootUser = await User.findOne({ email: 'root@admin.com', role: 'admin' });
      if (!rootUser) {
        rootUser = new User({
          name: 'root',
          email: 'root@admin.com',
          password: 'root',
          role: 'admin'
        });
        await rootUser.save();
      }
      return res.json({ token: `mock-jwt-token-${rootUser._id}`, user: rootUser });
    }

    // Normal user login check allowing email or name (if using email field)
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Return mock token and user details
    res.json({ token: `mock-jwt-token-${user._id}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
