// services/UserService.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../utils/mail');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // If both user and password are valid, return the user
    return user;
  } catch (error) {
    // Catch any errors that occurred during the authentication process
    throw new Error('Authentication failed: ' + error.message);
  }
};

exports.signup = async (username, email, password, userClass) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      class: userClass,
      score: 0,
      starsAchieved: 0,
    });

    await user.save();
    await sendWelcomeEmail(email,username)
    return user;
  } catch (error) {
    console.log(error.message)
    throw new Error('Signup failed: ' + error.message);
  }
};

exports.saveScore = async (userId, score) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.totalScore += score;

    if (user.highestScore < score) {
      user.highestScore = score;
    }

    // Check and update starsAchieved
    if (user.totalScore >= 500) {
      user.starsAchieved = 1;
    }
    if (user.totalScore >= 700) {
      user.starsAchieved = 2;
    }
    if (user.totalScore >= 1000) {
      user.starsAchieved = 3;
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error('Save score failed: ' + error.message);
  }
};

exports.getTopFiveUsers = async () => {
  try {
    const topUsers = await User.find({})
      .sort({ highestScore: -1 }) // Sort by score in descending order
      .limit(5); // Limit to the top 5 users

    return topUsers;
  } catch (error) {
    throw new Error('Get top users failed: ' + error.message);
  }
};

exports.getUserScoreAndStars = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { highestScore, starsAchieved } = user;
    return { highestScore, starsAchieved };
  } catch (error) {
    throw new Error('Get user score and stars failed: ' + error.message);
  }
};
