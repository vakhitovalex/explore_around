const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorized-err');

module.exports = (req, res, next) => {
  // all the auth will go here
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('User is not authorized');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'alex-key');
  } catch (err) {
    throw new UnauthorizedError('User is not authorized');
  }
  req.user = payload;
  next();
};
