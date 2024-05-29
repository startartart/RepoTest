const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const order = (req, res) => {
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
  const delivery_id = 1;
  const order_id = 1;

  //   conn.query(sql, values, (err, results) => {
  //     if (err) return res.status(StatusCodes.BAD_REQUEST).end();

  //     const delivery_id = results.insertId;

  //     if (results) return res.status(StatusCodes.CREATED).json(results);
  //     return res.status(StatusCodes.NOT_FOUND).end();
  //   });

  const sql2 = `insert into orders (book_title, total_quantity, total_price, user_id, delivery_id)
                values (?, ?, ?, ?, ?)`;
  const values2 = [
    first_book_title,
    total_quantity,
    total_price,
    user_id,
    delivery_id,
  ];

  //   conn.query(sql2, values2, (err, results) => {
  //     if (err) return res.status(StatusCodes.BAD_REQUEST).end();

  //     const order_id = results.insertId;

  //     if (results) return res.status(StatusCodes.CREATED).json(results);
  //     return res.status(StatusCodes.NOT_FOUND).end();
  //   });

  const sql3 = `insert into orderedBook (order_id, book_id, quantity) values ?`;
  let values3 = [];
  
  items.forEach((item) => {
    values3.push([order_id, item.book_id, item.quantity]);
  });

  conn.query(sql3, [values3], (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();

    if (results) return res.status(StatusCodes.CREATED).json(results);
    return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const getOrders = (req, res) => {};

const getOrderDetail = (req, res) => {};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
