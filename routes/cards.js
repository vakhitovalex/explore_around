const express = require("express");
const router = express.Router();
const { getCardsInfo } = require("../controllers/cardsController");

router.get("/cards", getCardsInfo);

module.exports = router;
