const express = require("express");

const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Add a new product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        seller: req.body.seller,
        imageUrls: req.body.imageUrls,
        extras: req.body.extras,
    })
    try {
        const savedProduct = await product.save()
        res.status(200).json({
            message: "Product added successfully",
            product: savedProduct 
        })
    } catch (error) {
        res.status(401).json({ message: error });
    }
})

// Fetch single product
router.get('/:productId', async (req, res) => {
    try {
        const singleProduct = await Product.findById(req.params.productId);
        res.status(200).json({
            message: "Product fetched successfully",
            product: singleProduct
        })
    } catch (error) {
        res.status(401).json({ message: error });
    }
})

module.exports = router;
