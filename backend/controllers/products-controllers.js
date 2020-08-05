const Product = require("../models/product");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    const err = new Error("[GET][PRODUCTS] Fetching products failed");
    console.log(err.message);
    return next(err);
  }

  res.json({
    products: products.map((prod) => prod.toObject({ getters: true })),
  });
};

exports.getProducts = getProducts;
