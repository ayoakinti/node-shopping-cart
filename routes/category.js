const express = require('express');

const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// Create category
router.post('/', async (req, res) => {
  const categories = await Category.find({ name: req.body.name.toLowerCase() });
  if (categories.length !== 0) {
    return res.status(401).json({
      message: 'Category already exists',
    });
  }
  const category = new Category({
    name: req.body.name.toLowerCase(),
  });
  try {
    const savedCategory = await category.save();
    res.status(200).json({
      category: savedCategory,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get products per category
router.get('/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
