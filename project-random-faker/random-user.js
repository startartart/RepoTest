const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();

app.get('/fake/users/', (req, res) => {
  const { num } = req.query;

  let idx = 1;
  let users = [];
  while (idx <= num) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    });
    idx++;
  }
  res.status(200).json(users);
});

app.listen(5555);
