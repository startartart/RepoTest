const express = require('express');
const router = express.Router();
const {
  order,
  getOrders,
  getOrderDetail,
} = require('../controller/OrderController');

router.use(express.json());

router.post('/', order);

router.post('/', getOrders);

router.post('/:id', getOrderDetail);

module.exports = router;
