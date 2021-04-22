const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/usersController');
const auth = require('./middleware/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '601a35fec8121f0cdcb75316', // paste the _id of the test user created in the previous step
//   };

//   next();
// });

app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardsRouter);

app.get('*', (req, res) => {
  res.send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App is working at ${PORT}`);
});
