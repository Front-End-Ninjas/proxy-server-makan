const express = require('express');
const Promise = require('bluebird');
const path = require('path');
const request = Promise.promisifyAll(require('request'));
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
  const services = Object.keys(bundleTag);
  const files = [];

  const promises = Promise.map(services, service =>
    request.getAsync({
      url: bundlePath[service],
      method: 'GET',
    }).then((response) => {
      const { body, headers } = response;
      if (bundleTag[service] !== headers.etag) {
        files.push(fs.writeFileAsync(`client/bundles/${service}.js`, body)
          .then(() => {
            bundleTag[service] = headers.etag;
          })
          .catch(e => console.log(e)));
      }
    }).catch(e => console.log(e)));

  const similarPath = './client/bundles/similar.js';
  const imagePath = './client/bundles/images.js';
  const desPath = './client/bundles/description.js';
  const revPath = './client/bundles/reviews.js';
  const superPath = './client/bundles/super.js';

  Promise.all(promises)
    .then(() => {
      Promise.all(files)
        .then(() => {
          if (files.length) {
            concat([similarPath, imagePath, desPath, revPath], superPath)
              .then((result) => {
                console.log(result);
                res.send(result);
              })
              .catch(e => res.send(e));
          } else {
            res.sendFile(path.join(__dirname, '../../client/bundles/super.js'));
          }
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

module.exports = superbundle;
