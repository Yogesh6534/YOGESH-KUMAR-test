// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to request object
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateToken };
