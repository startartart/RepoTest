const express = require('express');
const router = express.Router();
const conn = require('../db');
const { body, param, validationResult } = require('express-validator');

router.use(express.json());

const validate = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err.array());
  next();
};
function notFoundChannel(res) {
  return res.status(404).json({
    message: '존재하지 않는 채널입니다.',
  });
}

router
  .route('/')
  .get(
    [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'), validate],
    (req, res) => {
      const id = parseInt(req.body.userId);
      const sql = `select * from channels where user_id = ${id}`;

      conn.query(sql, (err, results) => {
        if (err) return res.status(400).end();
        if (results.length) res.status(200).json(results);
        else notFoundChannel(res);
      });
    }
  )
  .post(
    [
      body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
      body('name').notEmpty().isString().withMessage('문자 입력 필요'),
      validate,
    ],
    (req, res) => {
      const { title, userId } = req.body;
      const sql = `insert into channels (title, user_id) values '${title}', ${parseInt(
        userId
      )}`;

      conn.query(sql, (err, results) => {
        if (err) return res.status(400).end();
        res.status(201).json(results);
      });
    }
  );

router
  .route('/:id')
  .get(
    [param('id').isEmpty().isInt().withMessage('채널 ID 필요'), validate],
    (req, res) => {
      const err = validationResult(req);
      if (!err.isEmpty()) return res.status(400).json(err.array());

      const id = parseInt(req.params.id);
      const sql = `select * from channels where id = ${id}`;

      conn.query(sql, (err, results) => {
        if (err) return res.status(400).end();
        if (results.length) res.status(200).json(results);
        else notFoundChannel(res);
      });
    }
  )
  .put(
    [
      param('id').isEmpty().isInt().withMessage('채널 ID 필요'),
      body('name').isEmpty().isString().withMessage('채널명 오류'),
      validate,
    ],
    (req, res) => {
      // const sql = `select * from channels where id = ${id}`;
      // conn.query(sql, (err, results) => {
      //   if (err) return res.status(400).end();
      //   if (results.length) res.status(200).json(results);
      //   else notFoundChannel(res);
      // });
      const { name } = req.body;
      const id = parseInt(req.params.id);

      const sql = `update channels set name=? where id=?`;
      const values = [name, id];

      conn.query(sql, values, (err, results) => {
        if (err) return res.status(400).end();
        if (results.affectedRows) return res.status(200).json(results);
        return res.status(400).end();
      });
    }
  )
  .delete(
    [param('id').isEmpty().isInt().withMessage('채널 ID 필요'), validate],
    (req, res) => {
      const id = parseInt(req.params.id);

      const sql = `delete from channels where id = ${id}`;
      conn.query(sql, values, (err, results) => {
        if (err) return res.status(400).end();
        if (results.affectedRows) return res.status(200).json(results);
        return res.status(400).end();
      });
    }
  );

module.exports = router;
