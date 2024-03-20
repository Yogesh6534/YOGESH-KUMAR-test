// src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: { type: String } // For storing OTP during forget password process
});

const User = mongoose.model('User', userSchema);

module.exports = User;
