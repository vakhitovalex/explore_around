const fsPromises = require('fs').promises;

function getFileContent(path) {
  return fsPromises
    .readFile(path, { encoding: 'utf8' })
    .then(JSON.parse)
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getFileContent,
};
