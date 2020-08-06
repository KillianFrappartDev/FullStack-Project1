const express = require('express');

const ordersControllers = require('../controllers/orders-controllers');

const router = express.Router();

router.get("/", ordersControllers.getOrders);

module.exports = router;