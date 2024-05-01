const json = require('./object-demo.js');
const express = require('express');
const app = express();

app.get('/hello', function (req, res) {
  res.json(json.hello);
});

app.get('/bye', function (req, res) {
  res.send('안녕히 가세요.');
});

app.get('/nicetomeetyou', function (req, res) {
  res.send('만나서 반갑습니다.');
});
