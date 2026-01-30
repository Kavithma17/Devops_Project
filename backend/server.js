const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const diaryRoutes = require('./routes/diaryRoutes');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moodApp';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Auto-login after signup for convenience
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, message: 'User registered!', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all users (without passwords)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Mount diary routes
app.use('/diary', diaryRoutes);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
