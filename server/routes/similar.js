const express = require('express');
const request = require('request');

const similar = express.Router();

similar.get('/item/:id', (req, res) => {
  console.log('PROXY-----', req.url);
  request({
    url: `http://localhost:3000/similar/${req.url}`,
    method: 'GET',
  }).pipe(res);
});

// similar.get('*', (req, res) => {
//   console.log('3000', req.url);
//   res.send(req.url);
// });

module.exports = similar;
