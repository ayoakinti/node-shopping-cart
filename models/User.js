const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  phone: { type: Number, required: false, min: 6 },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  created_at: { type: Number, default: Date.now() },
  verification: {
    status: { type: Boolean, required: false, default: false },
    token: { type: String, required: false, default: "" },
  },
});

module.exports = mongoose.model("User", userSchema);
