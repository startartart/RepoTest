const express = require('express');
const router = express.Router();

const userDB = new Map();

router.use(express.json());

function notFoundUser(res) {
  return res.status(401).json({ message: '존재하지 않는 회원입니다.' });
}
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
  else notFoundUser(res);
});

router.post('/join', (req, res) => {
  if (!req.body.userId || !req.body.pwd || !req.body.name)
    res
      .status(400)
      .json({ message: '올바르지 않거나 입력되지 않은 형식입니다.' });
  else {
    userDB.set(req.body.userId, req.body);
    res.status(201).json({
      message: `${
        userDB.get(req.body.userId).name
      }님. 회원가입에 성공하셨습니다.`,
    });
  }
});

router
  .route('/users')
  .get((req, res) => {
    const { userId } = req.body;
    const user = userDB.get(userId);
    if (user)
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    else notFoundUser(res);
  })
  .delete((req, res) => {
    const { userId } = req.body;
    const user = userDB.get(userId);
    if (user) {
      userDB.delete(parseInt(req.params.id));

      res.status(200).json({
        message: `${user.name}님은 정상적으로 회원탈퇴 하셨습니다.`,
      });
    } else notFoundUser(res);
  });

module.exports = router;
