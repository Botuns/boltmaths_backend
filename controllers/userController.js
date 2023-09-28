// controllers/UserController.js

const userService = require('../services/userService');

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.login(username, password);
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Signup
exports.signup = async (req, res) => {
  const { username, email, password, class: userClass } = req.body;
  try {
    const user = await userService.signup(username, email, password, userClass);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Registration failed' });
  }
};

exports.getTopFiveUsers = async (req, res) => {
    try {
      const topUsers = await userService.getTopFiveUsers();
      res.json(topUsers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch top users' });
    }
  };

  exports.getUserScoreAndStars = async (req, res) => {
    const userId = req.params.userId; 
    try {
      const userStats = await userService.getUserScoreAndStars(userId);
      res.json(userStats);
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
