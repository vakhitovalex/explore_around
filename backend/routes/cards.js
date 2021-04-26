const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsController');

router.get('/', getAllCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(40),
      link: Joi.string().uri().required(),
    }),
  }),
  createCard,
);
router.delete(
  '/:cardId',
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCard,
);
router.put(
  '/:cardId/likes',
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    body: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = router;
