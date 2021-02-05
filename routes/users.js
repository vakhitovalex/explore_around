const express = require('express');
const path = require('path');

const router = express.Router();

const {
  getUsersInfo,
  getOneUserInfo,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/usersController');

router.get('/users', getUsersInfo);
router.post('/users', createUser);
router.get('/users/:id', getOneUserInfo);
router.patch('/users/me', updateUserProfile);
router.patch('/users/avatar', updateUserAvatar);

module.exports = router;
