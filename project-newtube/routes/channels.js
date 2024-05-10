const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());

function notFoundChannel(res) {
  return res.status(404).json({
    message: '존재하지 않는 채널입니다.',
  });
}

function unCorrectForm(res) {
  return res
    .status(400)
    .json({ message: '올바르지 않거나 입력되지 않은 형식입니다.' });
}

router
  .route('/')
  .get((req, res) => {
    const id = parseInt(req.body.userId);
    const sql = `select * from channels where user_id = ${id}`;

    if (id)
      conn.query(sql, (err, results) => {
        if (results.length) res.status(200).json(results);
        else notFoundChannel(res);
      });
    else res.status(404);
  })
  .post((req, res) => {
    const { title, userId } = req.body;
    const sql = `insert into channels (title, user_id) values '${title}', ${parseInt(
      userId
    )}`;

    if (title && userId)
      conn.query(sql, (err, results) => {
        res.status(201).json(results);
      });
    else unCorrectForm(res);
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const sql = `select * from channels where id = ${id}`;

    conn.query(sql, (err, results) => {
      if (results.length) res.status(200).json(results);
      else notFoundChannel(res);
    });
  })
  .put((req, res) => {
    const channel = channelDB.get(parseInt(req.params.id));

    if (channel) {
      const preChannelTitle = channel.channelTitle;
      if (req.body.channelTitle) {
        channel.channelTitle = req.body.channelTitle;
        channelDB.set(parseInt(req.params.id), channel);
        res.json({
          message: `채널명이 ${preChannelTitle}에서 ${req.body.channelTitle}로 정상적으로 수정되었습니다.`,
        });
      } else unCorrectForm(res);
    } else notFoundChannel(res);
  })
  .delete((req, res) => {
    const channel = channelDB.get(parseInt(req.params.id));
    if (channel) {
      channelDB.delete(parseInt(req.params.id));
      res.status(200).json({
        message: `정상적으로 ${channel.channelTitle}(이)가 삭제되었습니다.`,
      });
    } else notFoundChannel(res);
  });

module.exports = router;
