const express = require('express');
const router = express.Router();

const channelDB = new Map();
let channelIdx = 1;

router.use(express.json());

function needLogin(res) {
  return res.status(404).json({ message: '로그인이 필요합니다.' });
}

function needLeastOneChannel(res) {
  return res
    .status(404)
    .json({ message: '하나 이상의 채널이 있어야 조회가 가능합니다.' });
}

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
    const { userId } = req.body;
    const idToChannels = [];

    if (channelDB.size && userId) {
      channelDB.forEach((channel) => {
        if (channel.userId === userId) return idToChannels.push(channel);
      });
      if (idToChannels.length) res.status(200).json(idToChannels);
      else needLeastOneChannel(res);
    } else {
      if (userId) needLeastOneChannel(res);
      else needLogin(res);
    }
  })
  .post((req, res) => {
    if (req.body.channelTitle) {
      channelDB.set(channelIdx++, req.body);
      res.status(200).json({
        message: `${
          channelDB.get(channelIdx - 1).channelTitle
        } 개설을 축하드립니다.`,
      });
    } else unCorrectForm(res);
  });

router
  .route('/:id')
  .get((req, res) => {
    const channel = channelDB.get(parseInt(req.params.id));
    if (channel) res.status(200).json(channel);
    else notFoundChannel(res);
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
