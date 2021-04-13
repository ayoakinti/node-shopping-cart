const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
const Cart = require('../models/Cart');

// Add to cart
router.post('/', verifyToken, async (req, res) => {
  const { savedBuyer } = await jwt.verify(req.token, 'secretkey');
  const cart = new Cart({
    color: req.body.color,
    productId: req.body.productId,
    size: req.body.size,
    quantity: req.body.quantity,
    buyerId: savedBuyer._id,
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

// Get cart by user
router.get('/:userId', async (req, res) => {
  try {
    const carts = await Cart.find({ productId: req.params.productId });
    res.status(200).json(carts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
