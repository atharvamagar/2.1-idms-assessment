const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '1h',
  });
};

const setCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 1000, 
});

// @route POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required',
        data: null,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
        data: null,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
        data: null,
      });
    }

    const token = generateToken(user._id);

    res.cookie('token', token, setCookieOptions());

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token, 
        user: { id: user._id, username: user.username, email: user.email },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
    data: null,
  });
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found', data: null });
    }
    res.status(200).json({ status: 'success', message: 'User fetched', data: user });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username, email, and password are required',
        data: null,
      });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'User already exists', data: null });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({
      status: 'success',
      message: 'User registered',
      data: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, getMe, register };
