const express = require('express');
const checkCache = require('../helpers/redisCache');
const { buildAndSendBundle } = require('../helpers/superBundleHandler');

const superbundle = express.Router();

superbundle.get('/', checkCache, buildAndSendBundle);

module.exports = superbundle;
