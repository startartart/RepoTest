const express = require('express');
const router = express.Router();

const channelDB = new Map();
let channelIdx = 1;

router.use(express.json());

router
  .route('/')
  .get((req, res) => {
    if (channelDB.size) res.status(200).json(Object.fromEntries(channelDB));
    else
      res
        .status(404)
        .json({ message: '하나 이상의 채널이 있어야 조회가 가능합니다.' });
  })
  .post((req, res) => {
    if (req.body.channelTitle) {
      channelDB.set(channelIdx++, req.body);
      res.status(200).json({
        message: `${
          channelDB.get(channelIdx - 1).channelTitle
        } 개설을 축하드립니다.`,
      });
    } else {
      res
        .status(400)
        .json({ message: '올바르지 않거나 입력되지 않은 형식입니다.' });
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    const channel = channelDB.get(parseInt(req.params.id));
    if (channel) res.status(200).json(channel);
    else
      res.status(404).json({
        message: '존재하지 않는 채널입니다.',
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
      } else
        res
          .status(400)
          .json({ message: '올바르지 않거나 입력되지 않은 형식입니다.' });
    } else
      res.status(404).json({
        message: '존재하지 않는 채널입니다.',
      });
  })
  .delete((req, res) => {
    const channel = channelDB.get(parseInt(req.params.id));
    if (channel) {
      channelDB.delete(parseInt(req.params.id));
      res.status(200).json({
        message: `정상적으로 ${channel.channelTitle}(이)가 삭제되었습니다.`,
      });
    } else
      res.status(404).json({
        message: '존재하지 않는 채널입니다.',
      });
  });

module.exports = router;
