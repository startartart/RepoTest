const conn = require('../db');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const allCategory = (req, res) => {
  const sql = `select * from category`;
  conn.query(sql, (err, results) => {
    if (err) return res.status(StatusCodes.BAD_REQUEST).end();
    return res.status(StatusCodes.CREATED).json(results);
  });
};

module.exports = {
  allCategory,
};
