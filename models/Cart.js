const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sizeObject: {
    type: Object,
    required: true,
  },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Cart', cartSchema);
