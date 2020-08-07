const express = require('express');

const checkAuth = require('../middlewares/check-auth');
const ordersControllers = require('../controllers/orders-controllers');

const router = express.Router();

router.get("/", ordersControllers.getOrders);

router.use(checkAuth);

router.post("/", ordersControllers.addOrder);

module.exports = router;