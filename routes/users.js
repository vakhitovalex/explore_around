const express = require("express");
const path = require("path");
const fsPromises = require("fs").promises;
const router = express.Router();

function getFileContent(path) {
  return fsPromises
    .readFile(path, { encoding: "utf8" })
    .then(JSON.parse)
    .catch((err) => {
      console.log(err);
    });
}

router.get("/users", (req, res) => {
  const pathToData = path.join(__dirname, "..", "data", "users.json");
  getFileContent(pathToData).then((users) => {
    res.send(users);
  });
});

router.get("/users/:id", (req, res) => {
  const pathToData = path.join(__dirname, "..", "data", "users.json");
  getFileContent(pathToData).then((users) => {
    const searchedUser = users.find((user) => user._id === req.params.id);
    if (searchedUser) {
      return res.status(200).send(searchedUser);
    } else {
      res.status(404).send({ message: "User ID not found" });
    }
  });
});

module.exports = router;
