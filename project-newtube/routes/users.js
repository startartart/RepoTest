const express = require('express');
const router = express.Router();

const userDB = new Map();
let userIdx = 1;

router.use(express.json());

router.post('/login', (req, res) => {
  const { userId, pwd } = req.body;
  let checkUser = {};

  userDB.forEach((user) => {
    if (userId === user.userId) checkUser = user;
  });

  if (Object.keys(checkUser).length)
    if (pwd === checkUser.pwd)
      res.json({ message: `${checkUser.name}님, 로그인에 성공하셨습니다.` });
    else res.status(401).json({ message: '올바르지 않은 비밀번호입니다.' });
  else res.status(401).json({ message: '존재하지 않는 회원입니다.' });
});

router.post('/join', (req, res) => {
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

router
  .route('/user/:id')
  .get((req, res) => {
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
  })
  .delete((req, res) => {
    const user = userDB.get(parseInt(req.params.id));
    if (user === undefined) {
      res.status(404).json({
        message: '존재하지 않는 회원입니다.',
      });
    } else {
      userDB.delete(parseInt(req.params.id));

      res.status(200).json({
        message: `${user.name}님은 정상적으로 회원탈퇴 하셨습니다.`,
      });
    }
  });

module.exports = router;