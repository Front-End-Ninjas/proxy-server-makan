const express = require('express');
const path = require('path');
const similar = require('./routes/similar');
const images = require('./routes/images');
const reviews = require('./routes/reviews');
const description = require('./routes/description');
const items = require('./routes/items');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

// app.use('/similar', similar);
app.use('/item', items);
// app.use('/images', images);
// app.use('/reviews', reviews);
// app.use('/description', description);

module.exports = app;
