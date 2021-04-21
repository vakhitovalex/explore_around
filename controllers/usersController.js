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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
  return User.findById(req.params.id)
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
    },
    {
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

module.exports = {
  getUsersInfo,
  getOneUserInfo,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
