const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Category', categorySchema);
