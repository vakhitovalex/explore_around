const path = require('path');
const { getFileContent } = require('./contentController');
const User = require('../models/user');

const pathToData = path.join(__dirname, '..', 'data', 'users.json');

function getUsersInfo(req, res) {
  return User.find({}).then((users) => {
    res.send(users).catch((err) => {
      res.status(404).send({ message: 'User not found' });
      res.status(500).send({ message: 'Something went wrong' });
    });
  });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      res
        .status(400)
        .send({ message: 'Error while creating new user: ' + err });
      res.status(500).send({ message: 'Something went wrong' });
    });
}

function getOneUserInfo(req, res) {
  return User.findById(req.params.id).then((user) => {
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
