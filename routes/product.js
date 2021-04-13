const express = require('express');

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
router.post('/', async (req, res) => {
  const { priceList } = req.body;
  // Get last color
  const colorObject = priceList[priceList.length - 1];
  // Get last size
  const { sizes } = colorObject;
  const sizeObject = sizes[sizes.length - 1];
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    shipping: req.body.shipping,
    categoryId: req.body.categoryId,
    brandId: req.body.brandId,
    sellerId: req.body.sellerId,
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
router.get('/:productId', async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.productId);
    const brandName = await Brand.findById(singleProduct.brandId);
    const sellerName = await Seller.findById(singleProduct.sellerId);
    const categoryName = await Category.findById(singleProduct.categoryId);
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json({
      message: 'Product fetched successfully',
      product: singleProduct,
      brandName,
      sellerName,
      categoryName,
      reviews,
    });
  } catch (error) {
    res.status(401).json({ message: 'This product does not exit' });
  }
});

module.exports = router;
