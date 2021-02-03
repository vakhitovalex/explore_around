const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(avatar) {
        const avatarRegex = /^(http|https):\/\/(www\.)?[0-9a-z._~:\/?#\[\]@!$&'\(\)*+,;=](#)?/i;
        return avatarRegex.test(avatar);
      },
      message: 'Sorry, your link is way too unique for us!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
