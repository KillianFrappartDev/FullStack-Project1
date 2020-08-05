const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }],
  orders: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Order' }]
});

module.exports = mongoose.model('User', userSchema);