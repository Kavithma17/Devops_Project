const express = require('express');
const router = express.Router();
const DiaryEntry = require('../models/DiaryEntry');
const authMiddleware = require('../middleware/authMiddleware');

// All routes below require auth
router.use(authMiddleware);

// Get entries for logged in user
router.get('/entries', async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ user: req.userId }).sort({ date: -1 });
    res.json({ success: true, entries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create entry
router.post('/entries', async (req, res) => {
  const { title, content, mood, date } = req.body;
  if (!content || !mood) {
    return res.status(400).json({ success: false, message: 'Content and mood are required' });
  }
  try {
    const allowedMoods = DiaryEntry.schema.path('mood').enumValues;
    if (!allowedMoods.includes(mood)) {
      return res.status(400).json({
        success: false,
        message: `Invalid mood. Allowed: ${allowedMoods.join(', ')}`
      });
    }

    const newEntry = new DiaryEntry({
      title: title || 'Untitled',
      content,
      mood,
      date: date ? new Date(date) : Date.now(),
      user: req.userId
    });
    const saved = await newEntry.save();
    res.status(201).json({ success: true, entry: saved });
  } catch (error) {
    console.error(error);
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update entry
router.put('/entries/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, mood, date } = req.body;
  try {
    const allowedMoods = DiaryEntry.schema.path('mood').enumValues;
    if (mood && !allowedMoods.includes(mood)) {
      return res.status(400).json({
        success: false,
        message: `Invalid mood. Allowed: ${allowedMoods.join(', ')}`
      });
    }

    const updated = await DiaryEntry.findOneAndUpdate(
      { _id: id, user: req.userId },
      { $set: { title, content, mood, date: date ? new Date(date) : Date.now() } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, entry: updated });
  } catch (error) {
    console.error(error);
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete entry
router.delete('/entries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await DiaryEntry.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, message: 'Entry deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
