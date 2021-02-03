const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(link) {
        const linkRegex = /^(http|https):\/\/(www\.)?[0-9a-z._~:\/?#\[\]@!$&'\(\)*+,;=](#)?/i;
        return linkRegex.test(link);
      },
      message: 'Sorry, your link is way too unique for us!',
    },
  },
  owner: {
    // link to the card author's model
    type: ObjectId,
    required: true,
  },
  likes: {
    // a list of users who liked the post,
    type: ObjectId,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
