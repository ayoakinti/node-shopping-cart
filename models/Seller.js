const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
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
  businessName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  phone: { type: Number, required: true, min: 6 },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
  },
  created_at: { type: Number, default: Date.now() },
  verification: {
    status: { type: Boolean, required: false, default: false },
    token: { type: String, required: false, default: '' },
  },
});

module.exports = mongoose.model('Seller', sellerSchema);
