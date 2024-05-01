const json = require('./data/object-demo-data.js');
const express = require('express');
const app = express();

app.get('/products/:id', function (req, res) {
  res.json(json.book[req.params.id - 1]);
});

app.get('/watch', function (req, res) {
  const q = req.query;
  res.json({
    video: q.v,
    timeline: q.t,
  });
});

app.listen(3000);
