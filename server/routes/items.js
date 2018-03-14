const express = require('express');
const request = require('request');
const { ports } = require('./pathCacheVariables');

const items = express.Router();

items.get('/:id/:service', (req, res) => {
  const { service } = req.params;

  request({
    url: `${ports[service]}/item${req.url}`,
    method: 'GET',
  }).pipe(res);
});

module.exports = items;
