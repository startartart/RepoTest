const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(64).toString('base64');
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('base64');

  const sql = `insert into users (email, password, salt) values (?, ?, ?)`;
  const values = [email, hashPassword, salt];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `select * from users where email = ?`;
  conn.query(sql, email, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    const loginUser = results[0];
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 64, 'sha512')
      .toString('base64');

    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '5m',
          issuer: 'byunggwon',
        }
      );
      res.cookie('token', token, {
        httpOnly: true,
      });
      console.log(token);

      return res.status(StatusCodes.OK).json(results);
    } else return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;

  const sql = `select * from users where email = ?`;

  conn.query(sql, email, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    const user = results[0];
    if (user)
      return res.status(StatusCodes.OK).json({
        email: email,
      });
    return res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;

  const sql = `update users set password = ?, salt = ? where email = ?`;

  const salt = crypto.randomBytes(64).toString('base64');
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('base64');

  const values = [hashPassword, salt, email];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results.affectedRows) return res.status(StatusCodes.OK).json(results);
    return res.status(StatusCodes.BAD_REQUEST).end();
  });
};

module.exports = {
  join,
  login,
  passwordResetRequest,
  passwordReset,
};
