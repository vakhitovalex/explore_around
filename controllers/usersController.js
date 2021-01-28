const path = require("path");
const { getFileContent } = require("./contentController");

const pathToData = path.join(__dirname, "..", "data", "users.json");

function getUsersInfo(req, res) {
  getFileContent(pathToData).then((users) => {
    res.send(users);
  });
}

function getOneUserInfo(req, res) {
  getFileContent(pathToData).then((users) => {
    const searchedUser = users.find((user) => user._id === req.params.id);
    if (searchedUser) {
      return res.status(200).send(searchedUser);
    } else {
      res.status(404).send({ message: "User ID not found" });
    }
  });
}

module.exports = {
  getUsersInfo,
  getOneUserInfo,
};
