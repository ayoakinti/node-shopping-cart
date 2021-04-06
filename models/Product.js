const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  extras: {
    color: {
      type: String,
      required: true,
    },
    dimensions: {
      length: {
        type: Number,
        required: true,
      },
      breadth: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model("Product", productSchema);
