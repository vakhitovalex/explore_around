const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/not-found-err');
const BadRequestError = require('../middleware/errors/bad-request-err');

function getAllCards(req, res, next) {
  return Card.find({})
    .populate('user')
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Cards were not found :(');
      }
      res.send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError(
          'Please put correct name and link for the card',
        );
      }
      res.send(card);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  return Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card was not found :(');
      }
      return res.status(200).send({ message: `${card._id} was deleted` });
    })
    .catch(next);
}

function likeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card was not found :(');
      }
      res.send({ message: `${card._id} was liked` });
    })
    .catch(next);
}

function dislikeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card was not found :(');
      }
      res.send({ message: `${card._id} was unliked` });
    })
    .catch(next);
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
