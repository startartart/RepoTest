const {
  HELLO_WORLD_TOAST,
  NOT_FOUND_TOAST,
  EMPTY_NEWTUBER_TOAST,
  SIGN_UP_TOAST,
  DELETE_NEWTUBER_TOAST,
  DELETE_ALL_NEWTUBER_TOAST,
  CHANGE_NETUBE_CHANNEL_TOAST,
} = require('./constants');
const express = require('express');
const app = express();
const port = 3001;

const newtuber1 = {
  channelTitle: 'newTuber1',
  sub: 0,
  videoNum: 0,
};

const newtuber2 = {
  channelTitle: 'newTuber2',
  sub: 0,
  videoNum: 0,
};

const newtuber3 = {
  channelTitle: 'newTuber3',
  sub: 0,
  videoNum: 0,
};

const db = new Map();
let idx = 1;

db.set(idx++, newtuber1);
db.set(idx++, newtuber2);
db.set(idx++, newtuber3);

app.use(express.json());
app.get('/', (req, res) => {
  res.send(HELLO_WORLD_TOAST);
});

app.get('/newtuber/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const newtuber = db.get(id);
  if (newtuber == undefined)
    res.json({
      message: NOT_FOUND_TOAST,
    });
  else res.json(newtuber);
});

app.get('/newtubers', (req, res) => {
  res.json(Object.fromEntries(db));
});

app.post('/newtuber', (req, res) => {
  db.set(idx++, req.body);

  res.json({
    message: SIGN_UP_TOAST(db.get(idx - 1).channelTitle, idx),
  });
});

app.delete('/newtubers/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const newtuber = db.get(id);

  if (newtuber == undefined)
    res.json({
      message: NOT_FOUND_TOAST,
    });
  else {
    db.delete(id);
    res.json({
      message: DELETE_NEWTUBER_TOAST(newtuber.channelTitle),
    });
  }
});

app.delete('/newtubers', (req, res) => {
  if (db.size < 1) {
    res.json({
      message: EMPTY_NEWTUBER_TOAST,
    });
  } else {
    db.clear();
    res.json({
      message: DELETE_ALL_NEWTUBER_TOAST,
    });
  }
});

app.put('/newtubers/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const newtuber = db.get(id);

  if (newtuber == undefined)
    res.json({
      message: NOT_FOUND_TOAST,
    });
  else {
    const preTitle = newtuber.channelTitle;
    const changeTitle = req.body.channelTitle;
    newtuber.channelTitle = changeTitle;

    res.json({
      message: CHANGE_NETUBE_CHANNEL_TOAST(preTitle, changeTitle),
    });
  }
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
