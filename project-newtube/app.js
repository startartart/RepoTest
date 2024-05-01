const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

app.post('/login', (req, res) => {});

app.post('/join', (req, res) => {});

app.get('/user/:id', (req, res) => {});

app.delete('/user/:id', (req, res) => {});
