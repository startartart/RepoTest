const json = require('./data/object-demo-data.js');
const express = require('express');
const app = express();

app.listen(3000);

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/products/:id', function (req, res) {
  res.json(json.book[req.params.id]);
});
