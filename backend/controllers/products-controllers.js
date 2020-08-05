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

const addProduct = async (req, res, next) => {
  const { name, price, image } = req.body;

  const newProduct = new Product({
    name,
    price,
    image,
  });

  try {
    await newProduct.save();
  } catch (error) {
    const err = new Error("[POST][PRODUCTS] Add product failed");
    console.log(err.message);
    return next(err);
  }

  res.json({ newProduct });
};


exports.getProducts = getProducts;
exports.addProduct = addProduct;