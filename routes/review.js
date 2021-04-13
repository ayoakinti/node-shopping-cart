const express = require('express');

const router = express.Router();
const Review = require('../models/Review');

// Create review
router.post('/', async (req, res) => {
  const review = new Review({
    name: req.body.name,
    productId: req.body.productId,
    note: req.body.note,
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

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
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
