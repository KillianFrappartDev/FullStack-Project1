const mongoose = require('mongoose');

const Product = require("../models/product");
const User = require('../models/user');

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

const getProductsById = async (req, res, next) => {
  const uid = req.params.uid;

  let userWithProducts;
  try {
    userWithProducts = await User.findById(uid).populate('products');
  } catch (error) {
    const err = new Error("[GET][PRODUCTS] Fetching products by user id failed");
    console.log(err.message);
    return next(err);
  }

  res.json({
    products: userWithProducts.products.map((prod) => prod.toObject({ getters: true })),
  });
}

const addProduct = async (req, res, next) => {
  const { name, price, image, userId } = req.body;

  const newProduct = new Product({
    name,
    price,
    image,
    user: userId
  });

  console.log("TEST " + newProduct);

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    const err = new Error("[POST][PRODUCTS] Add product failed (Could not find user by id.)");
    console.log(err.message);
    return next(err);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newProduct.save({ session: sess });
    user.products.push(newProduct);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const err = new Error("[POST][PRODUCTS] Add product failed");
    console.log(err.message);
    return next(err);
  }

  console.log("ADD PRODUCT");
  res.json({ newProduct });
};

const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;

  let product;
  try {
    product = await Product.findById(pid);
  } catch (error) {
    const err = new Error("[DELETE][PRODUCTS] Delete product failed (Could not find corresponding ID)");
    console.log(err.message);
    return next(err);
  }

  if (!product) {
    return next(new Error("[DELETE][PRODUCTS] Delete product failed (Could not find corresponding ID)"));
  }

  try {
    await product.remove();
  } catch (error) {
    const err = new Error("[DELETE][PRODUCTS] Delete product failed (Could not delete from db)");
    console.log(err.message);
    return next(err);
  }

  console.log("DELETE PRODUCT");
  res.json({message: "Product deleted"});
}


exports.getProducts = getProducts;
exports.getProductsById = getProductsById;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;