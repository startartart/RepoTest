const express = require('express');
const app = express();
const port = 3001;

const userDB = new Map();
let userIdx = 1;

app.post('/login', (req, res) => {});

app.use(express.json());
app.post('/join', (req, res) => {
  if (!req.body.userId || !req.body.pwd || !req.body.name)
    res
      .status(400)
      .json({ message: '올바르지 않거나 입력되지 않은 형식입니다.' });
  else {
    userDB.set(userIdx++, req.body);
    res.status(201).json({
      message: `${userDB.get(userIdx - 1).name}님. 회원가입에 성공하셨습니다.`,
    });
  }
});

app.get('/user/:id', (req, res) => {
  const user = userDB.get(parseInt(req.params.id));
  if (user === undefined) {
    res.status(404).json({
      message: '존재하지 않는 회원입니다.',
    });
  } else {
    res.status(200).json({
      userId: user.userId,
      name: user.name,
    });
  }
});

app.delete('/user/:id', (req, res) => {});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
