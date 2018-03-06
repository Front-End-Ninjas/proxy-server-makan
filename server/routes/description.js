const express = require('express');
const request = require('request');

const description = express.Router();

description.get('*', (req, res) => {
  console.log('DESCRIPTION-------', req.url);
  request({
    url: `http://localhost:3001/description/${req.url}`,
    method: 'GET',
  }).pipe(res);
});

module.exports = description;
