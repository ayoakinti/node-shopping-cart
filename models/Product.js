const mongoose = require('mongoose');

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
    min: 2,
  },
  shipping: {
    type: String,
    required: true,
    min: 2,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  brandId: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  extras: [
    {
      type: String,
      required: true,
    },
  ],
  priceList:
  [
    {
      color: {
        type: String,
        required: true,
      },
      sizes: [
        {
          size: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      imageUrls: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Product', productSchema);
