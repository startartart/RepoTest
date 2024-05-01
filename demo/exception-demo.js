const express = require('express');
const app = express();
app.listen(3001);

const fruits = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'watermelon' },
  { id: 3, name: 'lemon' },
  { id: 4, name: 'banana' },
];

app.get('/fruits', (req, res) => {
  res.json(fruits);
});

app.get('/fruits/:id', (req, res) => {
  const id = req.params.id;

  const current = fruits.find((fruit) => fruit.id === parseInt(id));

  if (current) res.json(current);
  else res.status(404).json({ message: 'not found fruits id.' });
});
