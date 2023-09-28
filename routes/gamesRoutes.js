// routes/GameRoutes.js

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/saveScore', gameController.saveScore);

module.exports = router;
