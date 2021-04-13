const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Create review
router.post('/', verifyToken, async (req, res) => {
  const { savedBuyer } = await jwt.verify(req.token, 'secretkey');
  const user = {
    name: {
      firstName: savedBuyer.name.firstName,
      lastName: savedBuyer.name.lastName,
    },
  };
  const review = new Review({
    user,
    productId: req.body.productId,
    note: req.body.note,
    remark: req.body.remark,
    rating: req.body.rating,
  });
  try {
    const savedReview = await review.save();
    res.status(200).json({
      review: savedReview,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get reviews by product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
