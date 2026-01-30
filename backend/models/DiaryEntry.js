 // models/DiaryEntry.js
const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    default: 'Untitled' 
  },
  content: { 
    type: String, 
    required: true 
  },
  mood: { 
    type: String, 
    enum: ['great', 'okay', 'low'], 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);
