// controllers/GameController.js

const userService = require('../services/userService');

exports.saveScore = async (req, res) => {
  const { userId, score } = req.body;
  try {
    const updatedUser = await userService.saveScore(userId, score);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to save score' });
  }
};
