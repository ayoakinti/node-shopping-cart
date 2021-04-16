const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add to cart
router.post('/add', verifyToken, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({
      message: 'Invalid Token',
    });
  }
  const { savedBuyer } = await jwt.verify(req.token, 'secretkey');
  let cart = await Cart.find({ buyerId: savedBuyer._id });
  const duplicateCart = cart.filter(
    (item) => item.productId === req.body.productId
      && item.color === req.body.color
      && item.size === req.body.size,
  );
  if (duplicateCart.length > 0) {
    await Cart.updateOne(
      { _id: duplicateCart[0]._id },
      { quantity: duplicateCart[0].quantity + req.body.quantity },
    );
    cart = await Cart.find({ buyerId: savedBuyer._id });
    return res.status(200).json({
      cart,
      message: 'Cart updated successfully',
    });
  }
  const product = await Product.findOne({ _id: req.body.productId });
  const colorArray = product.priceList;
  const image = colorArray.filter((item) => item.color === req.body.color)[0]
    .imageUrls[0];
  const sizeArray = colorArray[0].sizes;
  const sizeObject = sizeArray.filter((size) => size.size === req.body.size)[0];

  const newCart = new Cart({
    color: req.body.color,
    productId: req.body.productId,
    size: req.body.size,
    quantity: req.body.quantity,
    buyerId: savedBuyer._id,
    image,
    sizeObject,
    name: product.name,
  });
  try {
    const savedCart = await newCart.save();
    cart = await Cart.find({ buyerId: savedBuyer._id });
    res.status(200).json({
      savedCart,
      cart,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Remove from cart
router.post('/remove', verifyToken, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({
      message: 'Invalid Token',
    });
  }
  const { savedBuyer } = await jwt.verify(req.token, 'secretkey');
  const removedCart = await Cart.findOne({
    buyerId: savedBuyer._id,
    _id: req.body.cartId,
  });
  try {
    if (removedCart.quantity - req.body.quantity > 0) {
      await Cart.updateOne(
        { buyerId: savedBuyer._id, _id: req.body.cartId },
        { quantity: removedCart.quantity - req.body.quantity },
      );
    } else {
      await Cart.deleteOne({ buyerId: savedBuyer._id, _id: req.body.cartId });
    }
    const cart = await Cart.find({ buyerId: savedBuyer._id });
    return res.status(200).json({
      cart,
      message: 'Cart updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ carts, message: 'Fetched carts successfully' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get cart by user
router.get('/user', verifyToken, async (req, res) => {
  if (!req.token) {
    return res.status(401).json({
      message: 'Invalid Token',
    });
  }
  const { savedBuyer } = await jwt.verify(req.token, 'secretkey');
  try {
    const cart = await Cart.find({ buyerId: savedBuyer._id });
    // const product = await Product.find({ _id: carts })
    res.status(200).json({ cart, message: 'Fetched user cart successfully' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
