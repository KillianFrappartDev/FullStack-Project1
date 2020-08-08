const express = require('express');

const checkAuth = require('../middlewares/check-auth');
const ordersControllers = require('../controllers/orders-controllers');

const router = express.Router();

router.use(checkAuth);

router.get("/:uid", ordersControllers.getOrders);

router.post("/", ordersControllers.addOrder);

module.exports = router;