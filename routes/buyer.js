const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const router = express.Router();
const Buyer = require('../models/Buyer');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Buyer.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Register a new user
router.post('/', async (req, res) => {
  const user = await Buyer.find({ email: req.body.email });
  if (user.length !== 0) {
    return res.status(401).json({
      message: 'This user already exists',
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newBuyer = new Buyer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hash,
      businessName: req.body.businessName.toLowerCase(),
    });
    const savedBuyer = await newBuyer.save();
    jwt.sign({ savedBuyer }, 'secretkey', (err, token) => {
      res.status(200).json({ user: savedBuyer, token });
    });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const user = await Buyer.find({ email: req.body.email });
  if (user.length === 0) {
    return res.status(400).json({
      message: 'This user doesn\'t exist',
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      res.status(200).json({
        message: 'Buyer logged in successfully',
        user,
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
