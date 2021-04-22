const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function getUsersInfo(req, res) {
  return User.find({})
    .then((users) => {
      if (users) {
        res.send(users);
        return;
      }
      res.status(404).send({ message: 'User not found' });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong: ${err}` }),
    );
}

function createUser(req, res) {
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
      }),
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: `Error while creating new user: ${err}` });
      }
      return res.status(500).send({ message: `Something went wrong: ${err}` });
    });
}

function getOneUserInfo(req, res) {
  return User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(404).send({ message: 'User not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data input' });
        return;
      }
      res.status(500).send({ message: `Something went wrong: ${err}` });
    });
}

function updateUserProfile(req, res) {
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
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(404).send({ message: 'User not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid data input' });
        return;
      }
      res.status(500).send({ message: `Something went wrong: ${err}` });
    });
}

function updateUserAvatar(req, res) {
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
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(400).send({ message: 'Error while updating user' });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong: ${err}` }),
    );
}

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'alex-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      res.status(401).send({ message: err.message });
    });
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
}

module.exports = {
  getUsersInfo,
  getOneUserInfo,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
