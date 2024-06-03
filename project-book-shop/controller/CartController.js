const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const ensureAuthorization = require('../utils/ensureAuthorization');
dotenv.config();

const addToCart = (req, res) => {
  const { book_id, quantity } = req.body;
  const id = ensureAuthorization(req);
  if (id instanceof jwt.TokenExpiredError)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  else if (id instanceof jwt.JsonWebTokenError)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });

  const sql = `insert into cartItems (book_id, quantity, user_id) values (?, ?, ?)`;
  const values = [book_id, quantity, id];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const getCartItems = (req, res) => {
  const { selected } = req.body;
  const id = ensureAuthorization(req);
  if (id instanceof jwt.TokenExpiredError)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  else if (id instanceof jwt.JsonWebTokenError)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });

  const sql = `select cartItems.id, book_id, title, summary, quantity, price
                from cartItems left join books
                on cartItems.book_id = books.id
                where user_id = ? and cartItems.id in (?)`;
  const values = [id, selected];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const removeCartItem = (req, res) => {
  const cart_item_id = req.params.id;
  const sql = `delete from cartItems where id = ?`;
  conn.query(sql, cart_item_id, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
};
