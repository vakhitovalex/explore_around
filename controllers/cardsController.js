const path = require('path');
const { getFileContent } = require('./contentController');
const pathToData = path.join(__dirname, '..', 'data', 'cards.json');

function getCardsInfo(req, res) {
  getFileContent(pathToData).then((cards) => {
    res.send(cards);
  });
}

module.exports = {
  getCardsInfo,
};
