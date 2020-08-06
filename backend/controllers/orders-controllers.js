const Order = require("../models/order");

const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (error) {
    const err = new Error("[GET][ORDERS] Get orders failed");
    console.log(err.message);
    return next(err);
  }

  console.log("GET ORDERS");
  res.json({ orders: orders.map((item) => item.toObject({ getters: true })) });
};

exports.getOrders = getOrders;
