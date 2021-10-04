const { connect } = require('mongoose');
const { config } = require('dotenv');
//

const { NODE_ENV, MONGODB_URI } = process.env;

module.exports = () => {
  config();
  connect(
    NODE_ENV === 'production'
      ? MONGODB_URI
      : 'mongodb://localhost:27017/aroundb',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
};
