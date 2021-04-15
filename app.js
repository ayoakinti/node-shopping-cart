const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors middleware
app.use(cors());

const buyerRoute = require('./routes/buyer');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const brandRoute = require('./routes/brand');
const sellerRoute = require('./routes/seller');
const reviewRoute = require('./routes/review');
const cartRoute = require('./routes/cart');
const dashboardRoute = require('./routes/dashboard');

// Routes middleware
app.use('/buyer', buyerRoute);
app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/brand', brandRoute);
app.use('/seller', sellerRoute);
app.use('/review', reviewRoute);
app.use('/cart', cartRoute);
app.use('/dashboard', dashboardRoute);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, GET, POST, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  // for preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const PORT = process.env.PORT || '8080';

mongoose.connect(
  process.env.MONGODB_CONNECTION_KEY,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB!');
  },
);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
