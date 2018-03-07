const express = require('express');
const request = require('request');
const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const concat = require('concat');
const bundlePath = require('./bundlePaths/bundlePaths');

const superbundle = express.Router();

const bundleTag = {
  similar: null,
  reviews: null,
  description: null,
  images: null,
};

superbundle.get('/', (req, res) => {
  const promises = [];

  for (let service in bundleTag) {
    request({
      url: `http://localhost:${bundlePath[service]}`,
      method: 'GET',
    }, (err, response) => {
      const { body, headers } = response;
      if (err) {
        console.log(err);
      }
      if (bundleTag[service] !== headers.etag) {
        promises.push(fs.writeFile(`client/bundles/${service}.js`, body, (err) => {
          bundleTag[service] = headers.etag;
        }));
      }
    });
  }
  const similarPath = './client/bundles/similar.js';
  const imagePath = './client/bundles/images.js';
  const desPath = './client/bundles/description.js';
  const revPath = './client/bundles/reviews.js';
  const superPath = './client/bundles/super.js';

  if (promises.length) {
    Promise.all(promises).then(() => {
      concat([similarPath, imagePath, desPath, revPath], superPath)
        .then((result) => {
          res.send(result);
        })
        .catch(e => res.send(e));
    });
  } else {
    res.sendFile(path.join(__dirname, '../../client/bundles/super.js'));
  }
});

module.exports = superbundle;
