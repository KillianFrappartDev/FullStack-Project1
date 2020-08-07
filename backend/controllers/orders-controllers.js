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

const addOrder = async (req, res, next) => {
  const { product, price, userName } = req.body;

  const today = new Date();
  const date = `0${(today.getMonth()+1)}/0${today.getDate()}`;

  const newOrder = new Order({
    date,
    product,
    price,
    user: userName,
  });

  console.log(userName);
  console.log(newOrder);

  try {
    await newOrder.save();
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
