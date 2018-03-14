const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const fs = Promise.promisifyAll(require('fs'));

const getBundle = url => request.getAsync({
  url,
  method: 'GET',
});

const writeBundle = (bundlePath, fileName, body) => fs.writeFileAsync(`${bundlePath}${fileName}.js`, body);

module.exports = {
  getBundle,
  writeBundle,
};
