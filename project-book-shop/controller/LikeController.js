const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ensureAuthorization = require('../utils/auth');

const addLike = (req, res) => {
  const book_id = req.params.id;
  const id = ensureAuthorization(req);
  if (id instanceof jwt.TokenExpiredError)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  else if (id instanceof jwt.JsonWebTokenError)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  else if (id instanceof ReferenceError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 접근입니다.',
    });
  }

  const sql = `insert into likes (user_id, liked_book_id) values (?, ?)`;
  const values = [id, book_id];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const removeLike = (req, res) => {
  const book_id = req.params.id;
  const id = ensureAuthorization(req);
  if (id instanceof jwt.TokenExpiredError)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  else if (id instanceof jwt.JsonWebTokenError)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });
  else if (id instanceof ReferenceError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 접근입니다.',
    });
  }

  const sql = `delete from likes where user_id = ? and liked_book_id = ?`;
  const values = [id, book_id];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = {
  addLike,
  removeLike,
};
