const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  active: {
    type: Boolean,
    default: true,
  },
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Brand', brandSchema);
