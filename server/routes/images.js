const express = require('express');
const request = require('request');

const images = express.Router();

images.get('/item/:id', (req, res) => {
  console.log('GOT ME', req.url);
  request({
    url: `http://localhost:3003/images/${req.url}`,
    method: 'GET',
  }).pipe(res);
});

module.exports = images;
