const mongoose = require('mongoose');

const Order = require("../models/order");
const User = require('../models/user');
const Product = require('../models/product');

const getOrders = async (req, res, next) => {
  const uid = req.params.uid;

  let userWithOrders;
  try {
    userWithOrders = await User.findById(uid).populate('orders');
  } catch (error) {
    const err = new Error("[GET][ORDERS] Get orders failed (Could not find user by id.)");
    console.log(err.message);
    return next(err);
  }

  console.log("GET ORDERS");
  res.json({ orders: userWithOrders.orders.map((item) => item.toObject({ getters: true })) });
};

const addOrder = async (req, res, next) => {
  const { product, price, userName, productId } = req.body;

  let prod;
  try {
    prod = await Product.findById(productId);
  } catch (error) {
    const err = new Error("[POST][ORDERS] Add orders failed (Could not find product by id.)");
    console.log(err.message);
    return next(err);
  }

  const today = new Date();
  const date = `0${(today.getMonth()+1)}/0${today.getDate()}`;

  const newOrder = new Order({
    date,
    product,
    price,
    user: userName,
    seller: prod.user
  });
  console.log(newOrder);

  let user;
  try {
    user = await User.findById(prod.user);
  } catch (error) {
    const err = new Error("[POST][ORDERS] Add orders failed (Could not find user by id.)");
    console.log(err.message);
    return next(err);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newOrder.save({ session: sess });
    user.orders.push(newOrder);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const err = new Error("[POST][ORDERS] Add orders failed");
    console.log(err.message);
    return next(err);
  }

  console.log("ORDER ADDED");
  res.json({message: "Order sent."});
}

exports.getOrders = getOrders;
exports.addOrder = addOrder;
