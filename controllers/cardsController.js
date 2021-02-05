const Card = require('../models/card');

function getCardsInfo(req, res) {
  return Card.find({})
    .populate('user')
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(404).send({ message: 'Card not found' });
      res.status(500).send({ message: 'Something went wrong' });
    });
  // getFileContent(pathToData).then((cards) => {
  //   res.send(cards);
  // });
}

function createCard(req, res) {
  console.log(req.user._id);
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(400)
        .send({ message: 'Error while creating new card: ' + err });
      res.status(500).send({ message: 'Something went wrong' });
    });
}

function deleteCard(req, res) {
  return Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ message: card._id + ' was deleted' }))
    .catch((err) => {
      res.status(400).send({ message: 'Error while deleting a card: ' + err });
      res.status(500).send({ message: 'Something went wrong' });
    });
}

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};

module.exports = {
  getCardsInfo,
  createCard,
  deleteCard,
};
