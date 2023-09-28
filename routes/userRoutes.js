// routes/UserRoutes.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /app/users/login:
 *   post:
 *     summary: User login
 *     description: Login a user by providing a username and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *       401:
 *         description: Authentication failed.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /app/users/signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user by providing user details.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Registration failed.
 */
router.post('/signup', userController.signup);

/**
 * @swagger
 * /app/users/topUsers:
 *   get:
 *     summary: Get top five users
 *     description: Get a list of the top five users based on their scores.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of the top five users.
 *       500:
 *         description: Failed to fetch top users.
 */
router.get('/topUsers', userController.getTopFiveUsers);

/**
 * @swagger
 * /app/users/{userId}/scoreAndStars:
 *   get:
 *     summary: Get user score and stars
 *     description: Get a user's score and stars achieved based on their user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User score and stars retrieved successfully.
 *       404:
 *         description: User not found.
 */
router.get('/:userId/scoreAndStars', userController.getUserScoreAndStars);

module.exports = router;
