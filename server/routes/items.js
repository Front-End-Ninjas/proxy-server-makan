const express = require('express');
const request = require('request');
const port = require('./ports');

const items = express.Router();

items.get('/:id/:service', (req, res) => {
  const { service } = req.params;

  request({
    url: `${port[service]}/item${req.url}`,
    method: 'GET',
  }).pipe(res);
});

module.exports = items;
