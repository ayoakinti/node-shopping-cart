const express = require('express');

const router = express.Router();
const Brand = require('../models/Brand');
const Product = require('../models/Product');

// Create brand
router.post('/', async (req, res) => {
  const brands = await Brand.find({ name: req.body.name.toLowerCase() });
  if (brands.length !== 0) {
    return res.status(401).json({
      message: 'Brand already exists',
    });
  }
  const brand = new Brand({
    name: req.body.name.toLowerCase(),
  });
  try {
    const savedBrand = await brand.save();
    res.status(200).json({
      brand: savedBrand,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ brands, message: 'Fetched Brands successfully' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get products per brand
router.get('/:brandId', async (req, res) => {
  try {
    const products = await Product.find({ brandId: req.params.brandId });
    res.status(200).json({ products, message: 'Fetched Products successfully' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
