const express = require('express');

const checkAuth = require('../middlewares/check-auth');
const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get("/", productsControllers.getProducts);

router.use(checkAuth);

router.post("/", productsControllers.addProduct);

router.delete("/:pid", productsControllers.deleteProduct);

module.exports = router;