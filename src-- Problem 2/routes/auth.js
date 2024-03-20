// src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Forget Password route
router.post('/forget-password', authController.forgetPassword);

// Reset Password route
router.post('/reset-password', authController.resetPassword);

module.exports = router;
