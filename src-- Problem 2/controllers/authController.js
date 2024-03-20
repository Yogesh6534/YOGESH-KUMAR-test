// src/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Register user
exports.register = async (req, res) => {
    try {
      const { email, phoneNumber, password } = req.body;
  
      // Check if user with the provided email or phone number already exists
      let existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email or phone number already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ email, phoneNumber, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Login user
exports.login = async (req, res) => {
    try {
      const { email, phoneNumber, password } = req.body;
  
      // Find user by email or phone number
      const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email/phone number or password' });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email/phone number or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Forget Password
exports.forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate random OTP (or generate a password reset token/link)
      const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  
      // Send OTP to user's email
      // Example using nodemailer (update with your email sending logic)
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Error sending OTP' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Verify OTP (or password reset token/link)
      // For simplicity, let's assume OTP validation here
      // In real-world scenario, you may use JWT or other token-based validation
      if (otp !== user.otp) {
        return res.status(401).json({ error: 'Invalid OTP' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user's password
      user.password = hashedPassword;
      user.otp = null; // Clear OTP after successful password reset
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
