const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
      max: 255,
      min: 2,
    },
    lastName: {
      type: String,
      required: true,
      max: 255,
      min: 2,
    },
  },
  productId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
    min: 2,
  },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Review', reviewSchema);
