const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;
  const sql = `insert into cartItems (book_id, quantity, user_id) values (?, ?, ?)`;
  const values = [book_id, quantity, user_id];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const getCartItems = (req, res) => {
  const { user_id, selected } = req.body;
  const sql = `select cartItems.id, book_id, title, summary, quantity, price
                from cartItems left join books
                on cartItems.book_id = books.id
                where user_id = ? and cartItems.id in (?)`;
  const values = [user_id, selected];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const removeCartItem = (req, res) => {
  const { id } = req.params;
  const sql = `delete from cartItems where id = ?`;
  conn.query(sql, id, (err, results) => {
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
