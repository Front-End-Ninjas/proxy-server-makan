const express = require('express');
const request = require('request');

const reviews = express.Router();

reviews.get('*', (req, res) => {
  console.log('REVIEWS-----', req.url);
  request({
    url: `http://localhost:1337/reviews${req.url}`,
    method: 'GET',
  }).pipe(res);
});

module.exports = reviews;
