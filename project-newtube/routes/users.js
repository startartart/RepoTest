const express = require('express');
const router = express.Router();
const conn = require('../db');
const { body, param, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err.array());
  next();
};

function notFoundUser(res) {
  return res
    .status(401)
    .json({ message: '존재하지 않는 회원이거나 틀린 비밀번호입니다.' });
}

router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    validate,
  ],
  (req, res) => {
    const { email, password } = req.body;
    const sql = `select * from users where email = '${email}'`;

    conn.query(sql, (err, results) => {
      if (err) return res.status(400).end();

      let user = results[0];
      if (user && user.password == password) {
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          process.env.PRIVATE_LOGIN_KEY,
          {
            expiresIn: '30m',
            issuer: 'byunggwon',
          }
        );

        res.cookie('token', token, {
          httpOnly: true,
        });

        res.json({
          message: `${user.name}님, 로그인에 성공하셨습니다.`,
        });
      } else
        res.status(403).json({
          message: `이메일 또는 비밀번호 오류`,
        });
    });
  }
);

router.post(
  '/join',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
    body('name').notEmpty().isString().withMessage('이름 확인 필요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    body('phone_num')
      .notEmpty()
      .isString()
      .withMessage('휴대폰 번호 확인 필요'),
    validate,
  ],
  (req, res) => {
    const { email, name, password, phone_num } = req.body;

    const sql = `insert into users (email, name, password, phone_num) values (?, ?, ?, ?)`;
    const values = [email, name, password, phone_num];

    conn.query(sql, values, (err, results) => {
      if (err) return res.status(400).end();
      res.status(201).json(results);
    });
  }
);

router
  .route('/users')
  .get(
    [
      body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;
      const sql = `select * from users where email = '${email}'`;

      conn.query(sql, (err, results) => {
        if (err) return res.status(400).end();
        if (results.length) res.status(200).json(results);
        else notFoundUser(res);
      });
    }
  )
  .delete(
    [
      body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;
      const sql = `delete from users where email = '${email}'`;

      conn.query(sql, (err, results) => {
        res.status(200).json({
          message: `${user.name}님은 정상적으로 회원탈퇴 하셨습니다.`,
        });
      });
    }
  );

module.exports = router;
