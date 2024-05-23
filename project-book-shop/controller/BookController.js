const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const allBooks = (req, res) => {
  const { category_id } = req.query;

  if (category_id) {
    const sql = `select * from books where category_id = ?`;
    conn.query(sql, category_id, (err, results) => {
      if (err) return res.status(StatusCodes.BAD_REQUEST).end();

      if (results.length)
        return res.status(StatusCodes.CREATED).json(results[0]);
      return res.status(StatusCodes.NOT_FOUND).end();
    });
  } else {
    const sql = `select * from books`;
    conn.query(sql, (err, results) => {
      if (err) return res.status(StatusCodes.BAD_REQUEST).end();
      return res.status(StatusCodes.CREATED).json(results);
    });
  }
};

const bookDetail = (req, res) => {
  const { id } = req.params;
  const sql = `select * from books where id = ?`;
  conn.query(sql, id, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results[0]) return res.status(StatusCodes.CREATED).json(results[0]);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
