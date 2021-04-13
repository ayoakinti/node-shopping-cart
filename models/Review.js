const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  productId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  remark: {
    type: String,
    required: true,
    min: 2,
  },
  note: {
    type: String,
    required: false,
    min: 2,
  },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Review', reviewSchema);
