const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum: ['kg1', 'kg2', 'pry1', 'pry2', 'pry3', 'pry4', 'pry5'],
    required: true,
  },
  highestScore: {
    type: Number,
    default: 0, 
  },
  totalScore: {
    type: Number,
    default: 0, 
  },
  starsAchieved: {
    type: Number,
    default: 0, 
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
