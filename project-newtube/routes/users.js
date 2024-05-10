const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());

function notFoundUser(res) {
  return res
    .status(401)
    .json({ message: '존재하지 않는 회원이거나 틀린 비밀번호입니다.' });
}
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `select * from users where email = '${email}'`;

  conn.query(sql, (err, results) => {
    let user = results[0];
    if (user && user.password == password)
      res.json({
        message: `${user.name}님, 로그인에 성공하셨습니다.`,
      });
    else notFoundUser(res);
  });
});

router.post('/join', (req, res) => {
  const { email, name, password, phone_num } = req.body;

  if (!(email && name && password && phone_num))
    res
      .status(400)
      .json({ message: '올바르지 않거나 입력되지 않은 형식입니다.' });

  const sql = `insert into users (email, name, password, phone_num) values (?, ?, ?, ?)`;
  const values = [email, name, password, phone_num];

  conn.query(sql, values, (err, results) => {
    res.status(201).json(results);
  });
});

router
  .route('/users')
  .get((req, res) => {
    const { email } = req.body;
    const sql = `select * from users where email = '${email}'`;

    conn.query(sql, (err, results) => {
      if (results.length) res.status(200).json(results);
      else notFoundUser(res);
    });
  })
  .delete((req, res) => {
    const { email } = req.body;
    const sql = `delete from users where email = '${email}'`;

    conn.query(sql, (err, results) => {
      res.status(200).json({
        message: `${user.name}님은 정상적으로 회원탈퇴 하셨습니다.`,
      });
    });
  });

module.exports = router;
