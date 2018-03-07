const express = require('express');
const path = require('path');
const items = require('./routes/items');
const superbundle = require('./routes/bun');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/item', items);

app.use('/bundle', superbundle);

module.exports = app;
