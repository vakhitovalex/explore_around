const express = require('express');
const { celebrate, Joi } = require('celebrate');

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
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(40),
      about: Joi.string().required().min(2).max(200),
    }),
  }),
  updateUserProfile,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().min(2).max(40),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
