const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ensureAuthorization = require('../utils/auth');
const dotenv = require('dotenv');
dotenv.config();

const allBooks = (req, res) => {
  let all_books_res = {};
  const { category_id, news, limit, current_page } = req.query;

  const offset = limit * (current_page - 1);
  let sql = `select SQL_CALC_FOUND_ROWS *, (select count(*)
            from likes where liked_book_id = books.id)
            as likes from books `;
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
    if (results.length) all_books_res.books = results;
    else return res.status(StatusCodes.NOT_FOUND).end();
  });

  sql = `select found_rows()`;
  conn.query(sql, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    const pagination = {};
    pagination.current_page = current_page;
    pagination.total_count = results[0]['found_rows()'];

    all_books_res.pagination = pagination;

    return res.status(StatusCodes.CREATED).json(all_books_res);
  });
};

const bookDetail = (req, res) => {
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
    const book_id = req.params.id;
    const sql = `select *,
                (select count(*) from likes where liked_book_id = books.id) as likes,
              from books left join category
              on books.category_id = category.category_id where books.id = ?`;
    const values = [book_id];
    conn.query(sql, values, (err, results) => {
      if (err) return res.status(StatusCodes.BAD_REQUEST).end();

      if (results[0]) return res.status(StatusCodes.CREATED).json(results[0]);
      return res.status(StatusCodes.NOT_FOUND).end();
    });
  }

  const book_id = req.params.id;
  const sql = `select *,
                (select count(*) from likes where liked_book_id = books.id) as likes,
                (select exists (select * from likes where user_id = ? and liked_book_id = ?)) as liked
              from books left join category
              on books.category_id = category.category_id where books.id = ?`;
  const values = [id, book_id, book_id];
  conn.query(sql, values, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results[0]) return res.status(StatusCodes.CREATED).json(results[0]);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
