const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../utils/app-error');

const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return next(new AppError('Authentication token is missing', 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};

module.exports = authenticate;
