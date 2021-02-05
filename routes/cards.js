const express = require('express');
const router = express.Router();
const {
  getCardsInfo,
  createCard,
  deleteCard,
} = require('../controllers/cardsController');

router.get('/cards', getCardsInfo);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);

module.exports = router;
