const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/not-found-err');
const BadRequestError = require('../middleware/errors/bad-request-err');
const ForbiddenError = require('../middleware/errors/forbidden-err');

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
      res.status(201).send(card);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  return Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card was not found :(');
      } else if (!card.owner._id === req.user._id) {
        throw new ForbiddenError('Forbidden action, this card is not yours');
      }
      return res.status(200).send(card);
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
      res.status(200).send(card);
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
      res.status(200).send(card);
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
