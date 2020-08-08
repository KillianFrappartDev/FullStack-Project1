const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: { type: String, required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
