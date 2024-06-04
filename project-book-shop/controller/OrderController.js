const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const ensureAuthorization = require('../utils/auth');

const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  const id = ensureAuthorization(req);
  if (id instanceof jwt.TokenExpiredError)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: '로그인 세션이 만료되었습니다. 다시 로그인 하세요.',
    });
  else if (id instanceof jwt.JsonWebTokenError)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '잘못된 토큰입니다.',
    });

  const { items, delivery, total_quantity, total_price, first_book_title } =
    req.body;

  const sql = `insert into delivery (address, receiver, contact) values (?, ?, ?)`;
  const values = [delivery.address, delivery.receiver, delivery.contact];

  const [query1Results] = await conn.execute(sql, values);
  const delivery_id = query1Results.insertId;

  const sql2 = `insert into orders (book_title, total_quantity, total_price, user_id, delivery_id)
              values (?, ?, ?, ?, ?)`;
  const values2 = [
    first_book_title,
    total_quantity,
    total_price,
    id,
    delivery_id,
  ];

  const [query2Results] = await conn.execute(sql2, values2);
  const order_id = query2Results.insertId;

  const sql3 = `select book_id, quantity from cartItems where id in (?)`;
  const [query3Results, fields] = await conn.query(sql3, [items]);

  const sql4 = `insert into orderedBook (order_id, book_id, quantity) values ?`;
  const values3 = query3Results.map((item) => [
    order_id,
    item.book_id,
    item.quantity,
  ]);
  await conn.query(sql4, [values3]);

  const result = await deleteCartItems(conn, items);

  return res.status(StatusCodes.OK).json(result);
};

const deleteCartItems = async (conn, items) => {
  const sql = `delete from cartItems where id in (?)`;
  return await conn.query(sql, [items]);
};

const getOrders = async (req, res) => {
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
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  const sql = `select orders.id, created_at, address, receiver, contact, book_title, 
                total_quantity, total_price from orders left join delivery
                on orders.delivery_id = delivery.id`;
  const [rows, fields] = await conn.query(sql);

  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
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
  const order_id = req.params.id;
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  const sql = `select book_id, title, author, price, quantity
                from orderedBook left join books
                on orderedBook.book_id = books.id where order_id = ?`;
  const [rows, fields] = await conn.query(sql, [order_id]);

  return res.status(StatusCodes.OK).json(rows);
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
