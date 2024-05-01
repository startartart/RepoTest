const { youtubers } = require('./data/object-api-data.js');
const express = require('express');
const app = express();

app.get('/:nickname', function (req, res) {
  const { nickname } = req.params;
  if (!youtubers[nickname]) res.json({ message: '없습니다.' });
  res.json(youtubers[nickname]);
});

app.listen(3000);
