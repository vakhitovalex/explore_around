const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/usersController');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const NotFoundError = require('./middleware/errors/not-found-err');

require('./utils/initDB')();
require('dotenv').config();

const app = express();
const { PORT = 3001 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);

app.use('/', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.get('*', () => {
  throw new NotFoundError(`This page doesn't exist`);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App is working at ${PORT}`);
});
