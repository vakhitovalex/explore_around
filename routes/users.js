const express = require("express");
const path = require("path");

const router = express.Router();

const {
  getUsersInfo,
  getOneUserInfo,
} = require("../controllers/usersController");

router.get("/users", getUsersInfo);

router.get("/users/:id", getOneUserInfo);

module.exports = router;
