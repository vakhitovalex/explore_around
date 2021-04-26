const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middleware/errors/not-found-err');
const BadRequestError = require('../middleware/errors/bad-request-err');
const UnauthorizedError = require('../middleware/errors/unauthorized-err');
const ConflictError = require('../middleware/errors/conflict-err');

function getUsersInfo(req, res, next) {
  return User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('User not found :(');
      }
      res.send(users);
    })
    .catch(next);
}

function createUser(req, res, next) {
  // const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          if (!user) {
            throw new BadRequestError('Please put correct email or password');
          }
          res.status(201).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.status.code === '409') {
            throw new ConflictError('Please create unique user');
          }
        }),
    )
    .catch(next);
}

function getOneUserInfo(req, res, next) {
  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found :(');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err) {
        throw new BadRequestError('Invalid data input');
      }
    })
    .catch(next);
}

function updateUserProfile(req, res, next) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found :(');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Invalid data input');
      }
    })
    .catch(next);
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Invalid data input');
      }
      res.status(200).send(user);
    })
    .catch(next);
}

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password).then((user) => {
    if (!user) {
      throw new UnauthorizedError('User is not authorized');
    }
    const token = jwt.sign({ _id: user._id }, 'alex-key', {
      expiresIn: '7d',
    });
    res.send({ token });
  });
}

// authentication error
// User.findOne({ email })
//   .then((user) => {
//     if (!user) {
//       return Promise.reject(new Error('Incorrect password or email'));
//     }
//     return bcrypt.compare(password, user.password);
//   })
//   .then((passwordMatched) => {
//     if (!passwordMatched) {
//       return Promise.reject(new Error('Incorrect password or email'));
//     }
//     res.send({message: 'Everything is ok'})
//   })
//   .catch((err) => {
//     // return an authentication error
//     res.status(401).send({ message: err.message });
//   });

module.exports = {
  getUsersInfo,
  getOneUserInfo,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
