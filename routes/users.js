const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Register a new user
router.post("/", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length !== 0) {
    return res.status(401).json({
      message: "This user already exists",
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hash,
      businessName: req.body.businessName.toLowerCase()
    });
    const savedUser = await user.save();
    jwt.sign({ savedUser }, "secretkey", (err, token) => {
      res.status(200).json({ user: savedUser, token });
    });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user.length === 0) {
    return res.status(400).json({
      message: "This user doesn't exist",
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    } else {
      res.status(401).json({
        message: "Invalid email/password",
      });
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

module.exports = router;
