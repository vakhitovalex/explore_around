const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // all the auth will go here
  const { authorization } = req.headers;

  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'alex-key');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  req.user = payload;
  next();
};
