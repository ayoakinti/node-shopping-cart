const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  phone: { type: Number, required: false, min: 6 },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  address: [
    {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      postalCode: { type: Number, required: false },
    },
  ],
  created_at: { type: Number, default: Date.now() },
  verification: {
    status: { type: Boolean, required: false, default: false },
    token: { type: String, required: false, default: '' },
  },
});

module.exports = mongoose.model('Buyer', buyerSchema);
