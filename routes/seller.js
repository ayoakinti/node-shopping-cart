const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const router = express.Router();
const Seller = require('../models/Seller');

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Register a new seller
router.post('/', async (req, res) => {
  const seller = await Seller.find({ email: req.body.email });
  if (seller.length !== 0) {
    return res.status(401).json({
      message: 'This seller already exists',
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newSeller = new Seller({
      name: req.body.name,
      businessName: req.body.businessName.toLowerCase(),
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      password: hash,
      address: req.body.address,
    });
    const savedSeller = await newSeller.save();
    jwt.sign({ savedSeller }, 'secretkey', (err, token) => {
      res.status(200).json({ seller: savedSeller, token });
    });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

// Login a seller
router.post('/login', async (req, res) => {
  const savedSeller = await Seller.find({ email: req.body.email });
  if (savedSeller.length === 0) {
    return res.status(400).json({
      message: 'This seller doesn\'t exist',
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, savedSeller[0].password)) {
      jwt.sign({ savedSeller: savedSeller[0] }, 'secretkey', (err, token) => {
        res.status(200).json({ seller: savedSeller, token });
      });
    } else {
      res.status(401).json({
        message: 'Invalid email/password',
      });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

module.exports = router;
