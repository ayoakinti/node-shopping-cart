const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();
const Product = require('../models/Product');
const Seller = require('../models/Seller');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Review = require('../models/Review');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Add a new product
router.post('/', verifyToken, async (req, res) => {
  const { savedSeller } = await jwt.verify(req.token, 'secretkey');

  const { priceList } = req.body;
  // Get last color
  const colorObject = priceList[0];
  // Get last size
  const { sizes } = colorObject;
  const sizeObject = sizes[0];
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    shipping: req.body.shipping,
    categoryId: req.body.categoryId,
    brandId: req.body.brandId,
    sellerId: savedSeller._id,
    extras: req.body.extras,
    image: colorObject.imageUrls[0],
    price: sizeObject.price,
    priceList: req.body.priceList,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).json({
      message: 'Product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

// Fetch single product
router.get('/single/:productId', async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.productId);
    const brand = await Brand.findById(singleProduct.brandId);
    const seller = await Seller.findById(singleProduct.sellerId);
    const category = await Category.findById(singleProduct.categoryId);
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json({
      message: 'Product fetched successfully',
      product: singleProduct,
      brand: brand.name,
      seller: seller.businessName,
      category: category.name,
      reviews,
    });
  } catch (error) {
    res.status(401).json({ message: 'This product does not exit' });
  }
});

// Get products per seller
router.get('/seller', verifyToken, async (req, res) => {
  const { savedSeller } = await jwt.verify(req.token, 'secretkey');
  try {
    const products = await Product.find({ sellerId: savedSeller._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
