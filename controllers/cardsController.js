const Card = require('../models/card');

function getCardsInfo(req, res) {
  return Card.find({})
    .populate('user')
    .then((cards) => {
      if (cards) {
        res.send(cards);
        return;
      }
      res.status(404).send({ message: 'Card not found' });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong: ${err}` }),
    );
}

function createCard(req, res) {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card) {
        res.send(card);
        return;
      }
      res.status(400).send({ message: 'Error while creating new card' });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong: ${err}` }),
    );
}

function deleteCard(req, res) {
  return Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send({ message: `${card._id} was deleted` });
        return;
      }
      res.status(404).send({ message: `Card was not found` });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong. ${err}` }),
    );
}

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ message: `${card._id} was liked` });
        return;
      }
      res.status(404).send({ message: `Card was not found` });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong. ${err}` }),
    );
}

function dislikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ message: `${card._id} was unliked` });
        return;
      }
      res.status(404).send({ message: `Card was not found` });
    })
    .catch((err) =>
      res.status(500).send({ message: `Something went wrong. ${err}` }),
    );
}

module.exports = {
  getCardsInfo,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
