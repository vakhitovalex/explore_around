const Card = require('../models/card');

function getCardsInfo(req, res) {
  return Card.find({})
    .populate('user')
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(404).send({ message: `Card not found. ${err}` });
      res.status(500).send({ message: `Something went wrong. ${err}` });
    });
}

function createCard(req, res) {
  console.log(req.user._id);
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(400)
        .send({ message: `Error while creating new card: ${err}` });
      res.status(500).send({ message: `Something went wrong. ${err}` });
    });
}

function deleteCard(req, res) {
  return Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ message: `${card._id} was deleted` }))
    .catch((err) => {
      res.status(400).send({ message: `Error while deleting a card: ${err}` });
      res.status(500).send({ message: `Something went wrong. ${err}` });
    });
}

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
}

function dislikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
}

module.exports = {
  getCardsInfo,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
