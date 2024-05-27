const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const addLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const sql = `insert into likes (user_id, liked_book_id) values (?, ?)`;
  const values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const sql = `delete from likes where user_id = ? and liked_book_id = ?`;
  const values = [user_id, id];
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
