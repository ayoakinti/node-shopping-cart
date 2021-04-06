const express = require("express");

const router = express.Router();
const Seller = require("../models/Seller");
const Product = require("../models/Product");

// Create seller
router.post("/", async (req, res) => {
  const sellers = await Seller.find({ name: req.body.name.toLowerCase() });
  if (sellers.length !== 0) {
    return res.status(401).json({
      message: "Seller already exists",
    });
  }
  const seller = new Seller({
    name: req.body.name.toLowerCase(),
  });
  try {
    const savedSeller = await seller.save();
    res.status(200).json({
      seller: savedSeller,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get all sellers
router.get("/", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get products per seller
router.get("/:sellerId", async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.sellerId });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
