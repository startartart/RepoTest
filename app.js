const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World');
});

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

app.get('/newtuber/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const newtuber = db.get(id);
  if (newtuber == undefined)
    res.json({
      message: '뉴튜버 정보를 찾을 수 없습니다.',
    });
  else res.json(newtuber);
});

app.get('/newtubers', (req, res) => {
  res.json(Object.fromEntries(db));
});

app.post('/newtuber', (req, res) => {
  db.set(idx++, req.body);

  res.json({
    message: `${db.get(idx - 1).channelTitle}님은 ${idx}번째 뉴튜버입니다.`,
  });
});

app.delete('/newtubers/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const newtuber = db.get(id);

  if (newtuber == undefined)
    res.json({
      message: '뉴튜버 정보를 찾을 수 없습니다.',
    });
  else {
    const channelTitle = newtuber.channelTitle;
    db.delete(id);
    res.json({
      message: `${channelTitle}의 뉴튜브 채널이 삭제되었습니다.`,
    });
  }
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
