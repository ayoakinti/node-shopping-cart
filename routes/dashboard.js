const express = require('express');
const Category = require('../models/Category');

const router = express.Router();
const Dashboard = require('../models/Dashboard');
const Product = require('../models/Product');

// Create dashboard
router.post('/', async (req, res) => {
  const dashboard = new Dashboard({
    imageUrls: req.body.imageUrls,
  });
  try {
    const savedDashboard = await dashboard.save();
    res.status(200).json({
      dashboard: savedDashboard,
    });
  } catch (err) {
    res.status(400).json({ message: 'An error occured' });
  }
});

// Fetch dashboard
router.get('/', async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne();
    const featuredProducts = await Product.find().skip(Math.random() * 12).limit(8);
    const latestProducts = await Product.find().sort({ created_at: -1 }).limit(3);
    const cheapestProducts = await Product.find().sort({ price: -1 }).limit(3);
    const bestSellingProducts = await Product.find().skip(Math.random() * 17).limit(3);
    const featuredCategories = await Category.find().skip(Math.random() * 2).limit(2);
    res
      .status(200)
      .json({
        dashboard,
        featuredProducts,
        latestProducts,
        cheapestProducts,
        bestSellingProducts,
        featuredCategories,
        message: 'Fetched Dashboard successfully',
      });
  } catch (err) {
    res.status(400).json({ message: 'An error occured' });
  }
});

module.exports = router;
