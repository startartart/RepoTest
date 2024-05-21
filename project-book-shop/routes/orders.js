const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  res.json('주문 하기');
});

router.post('/', (req, res) => {
  res.json('주문 목록 조회');
});

router.post('/:id', (req, res) => {
  res.json('주문 상세 상품 조회');
});

module.exports = router;
