const express = require('express');

const router = express.Router();
const Cart = require('../models/Cart');

// Create cart
router.post('/', async (req, res) => {
  const cart = new Cart({
    color: req.body.color,
    productId: req.body.productId,
    size: req.body.size,
    quantity: req.body.quantity,
  });
  try {
    const savedCart = await cart.save();
    res.status(200).json({
      cart: savedCart,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get carts by product
router.get('/:productId', async (req, res) => {
  try {
    const carts = await Cart.find({ productId: req.params.productId });
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
