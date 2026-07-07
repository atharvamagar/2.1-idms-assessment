// Handles multer errors and general errors consistently
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      status: 'error',
      message: messages.join(', '),
      data: null,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      status: 'error',
      message: `${field} already exists`,
      data: null,
    });
  }

  if (err.message && err.message.includes('Only image files')) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      data: null,
    });
  }

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    data: null,
  });
};

module.exports = errorHandler;
