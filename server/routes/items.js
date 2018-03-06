const express = require('express');
const request = require('request');

const items = express.Router();

const getPort = (url) => {
  let port;
  if (url.includes('similar')) {
    port = 3000;
  }
  return port;
};

items.get('*', (req, res) => {
  console.log('HERE', req.url);
  const port = getPort(req.url);
  request({
    url: `http://localhost:${port}/item${req.url}`,
    method: 'GET',
  }).pipe(res);
});

module.exports = items;
