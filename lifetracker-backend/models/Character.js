// models/Character.js
const mongoose = require('mongoose');

const spaSchema = new mongoose.Schema({
  description: String,
  selectedStats: [String],
  difficulty: String,
  completed: Boolean,
  current: Boolean
});

const questSchema = new mongoose.Schema({
  title: String,
  spas: [spaSchema]
});

const characterSchema = new mongoose.Schema({
  name: String,
  stats: {
    strength: { totalXP: Number },
    endurance: { totalXP: Number },
    vigor: { totalXP: Number },
    creativity: { totalXP: Number },
    knowledge: { totalXP: Number },
    wisdom: { totalXP: Number }
  },
  quests: [questSchema]
}, {
  timestamps: true  // Automatically add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Character', characterSchema);