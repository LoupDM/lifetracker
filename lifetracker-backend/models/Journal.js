// models/Journal.js
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Journal', journalSchema);