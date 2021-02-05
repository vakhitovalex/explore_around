const express = require('express');
const path = require('path');

const router = express.Router();

const {
  getUsersInfo,
  getOneUserInfo,
  createUser,
} = require('../controllers/usersController');

router.get('/users', getUsersInfo);
router.post('/users', createUser);
router.get('/users/:id', getOneUserInfo);

module.exports = router;
