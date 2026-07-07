const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided. Please log in.',
        data: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Session expired. Please log in again.',
        data: null,
      });
    }
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.',
      data: null,
    });
  }
};

module.exports = protect;
