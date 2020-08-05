const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  // user: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

module.exports = mongoose.model("Product", productSchema);
