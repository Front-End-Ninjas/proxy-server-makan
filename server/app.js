const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

// app.get('/', (req, res) => {
//   res.status(200).send(`You got ${req.url}`);
// });

module.exports = app;
