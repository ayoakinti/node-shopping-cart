const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const router = express.Router();
const Buyer = require('../models/Buyer');

// Get all users [buyers]
router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Register a new buyer
router.post('/', async (req, res) => {
  const buyer = await Buyer.find({ email: req.body.email });
  if (buyer.length !== 0) {
    return res.status(401).json({
      message: 'This buyer already exists',
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newBuyer = new Buyer({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      password: hash,
      address: req.body.address,
    });
    const savedBuyer = await newBuyer.save();
    jwt.sign({ savedBuyer }, 'secretkey', (err, token) => {
      res.status(200).json({ buyer: savedBuyer, token });
    });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

// Login a buyer
router.post('/login', async (req, res) => {
  const savedBuyer = await Buyer.find({ email: req.body.email });
  if (savedBuyer.length === 0) {
    return res.status(400).json({
      message: 'This buyer doesn\'t exist',
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, savedBuyer[0].password)) {
      jwt.sign({ savedBuyer: savedBuyer[0] }, 'secretkey', (err, token) => {
        res.status(200).json({ buyer: savedBuyer, token });
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
