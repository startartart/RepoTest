const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const order = async (req, res) => {
  const conn = await mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bookshop',
    dateStrings: true,
  });

  const {
    items,
    delivery,
    total_quantity,
    total_price,
    user_id,
    first_book_title,
  } = req.body;

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
    user_id,
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

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
