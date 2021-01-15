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

router.get("/cards", (req, res) => {
  const pathToData = path.join(__dirname, "..", "data", "cards.json");
  getFileContent(pathToData).then((cards) => {
    res.send(cards);
  });
});

module.exports = router;
