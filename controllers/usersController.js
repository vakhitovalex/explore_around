const path = require('path');
const { getFileContent } = require('./contentController');
const User = require('../models/user');

const pathToData = path.join(__dirname, '..', 'data', 'users.json');

function getUsersInfo(req, res) {
  return User.find({}).then((users) => {
    res.send(users);
  });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) =>
      res
        .status(500)
        .send({ message: 'Error while creating new user: ' + err }),
    );
}

function getOneUserInfo(req, res) {
  return User.findOne({ _id: req.params.id }).then((user) => {
    // const searchedUser = users.find((user) => user._id === req.params.id);
    if (user) {
      return res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User ID not found' });
    }
  });
}

module.exports = {
  getUsersInfo,
  getOneUserInfo,
  createUser,
};
