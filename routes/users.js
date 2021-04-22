const express = require('express');

const router = express.Router();

const {
  getUsersInfo,
  getOneUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/usersController');

router.get('/users', getUsersInfo);
// router.post('/users', createUser);
// router.get('/users/:id', getOneUserInfo);
router.get('/users/me', getOneUserInfo);
router.patch('/users/me', updateUserProfile);
router.patch('/users/avatar', updateUserAvatar);

module.exports = router;
