const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const allBooks = (req, res) => {
  const { category_id, news, limit, current_page } = req.query;

  const offset = limit * (current_page - 1);
  let sql = `select * from books `;
  let values = [];

  if (category_id && news) {
    sql += `where category_id = ? and pub_date between date_sub(NOW(), INTERVAL 1 MONTH) and NOW() `;
    values.push(category_id);
  } else if (category_id) {
    sql += `where category_id = ? `;
    values.push(category_id);
  } else if (news)
    sql += `where pub_date between date_sub(NOW(), INTERVAL 1 MONTH) and NOW() `;

  sql += `LIMIT ? OFFSET ?`;
  values.push(parseInt(limit), offset);

  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results.length) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const bookDetail = (req, res) => {
  const { id } = req.params;
  const sql = `select * from books left join category on 
              books.category_id = category.id where books.id = ?`;
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
