const express = require('express');
const concat = require('concat');
const redis = require('redis');
const path = require('path');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const fs = Promise.promisifyAll(require('fs'));
const { serviceBundlePaths, bundleTagCache } = require('./pathAndCacheVariables');

const redisClient = redis.createClient();

const superbundle = express.Router();

const BUNDLE_FOLDER = path.join(__dirname, '../../client/bundles/');

const getBundle = url => request.getAsync({
  url,
  method: 'GET',
});

const writeBundle = (fileName, body) => fs.writeFileAsync(`${BUNDLE_FOLDER}${fileName}.js`, body);

const getBundleAndWrite = (url, service) => getBundle(url)
  .then((response) => {
    const { body, headers } = response;
    if (bundleTagCache[service] !== headers.etag) {
      return writeBundle(service, body)
        .then(() => {
          bundleTagCache[service] = headers.etag;
          return headers.etag;
        })
        .catch(e => console.log('Bundle failed to write', e)); // add npm log
    }
    return undefined;
  });

const getAllBundles = services => Promise.map(services, service =>
  getBundleAndWrite(serviceBundlePaths[service], service));

const buildBundle = services => getAllBundles(services)
  .then((result) => {
    if (result.some(tag => tag)) {
      const filePaths = services.map(fileName => `${BUNDLE_FOLDER}${fileName}.js`);

      return concat(filePaths, `${BUNDLE_FOLDER}super.js`)
        .then((bundle) => {
          redisClient.setex('bundle', 3600, bundle);
        });
    }
    return undefined;
  });

const buildAndSendBundle = (req, res) => {
  const services = Object.keys(bundleTagCache);
  buildBundle(services)
    .then(() => res.sendFile(`${BUNDLE_FOLDER}super.js`))
    .catch(e => res.send(e));
};

const checkCache = (req, res, next) => {
  redisClient.get('bundle', (err, data) => {
    if (err) {
      console.log('Failed to get from Redis', err);
      next();
    } else if (data != null) {
      res.send(data);
    } else {
      next();
    }
  });
};

superbundle.get('/', checkCache, buildAndSendBundle);

module.exports = superbundle;
