const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  imageUrls: {
    landingLeft: {
      type: String,
      required: true,
    },
    landingRight: {
      type: String,
      required: true,
    },
    landingMobile: {
      type: String,
      required: true,
    },
    clearanceSales: {
      type: String,
      required: true,
    },
    newArrivals: {
      type: String,
      required: true,
    },
  },
  //   featuredProducts: [
  //     {
  //       type: Object,
  //       required: true,
  //     },
  //   ],
  //   latestProducts: [
  //     {
  //       type: Object,
  //       required: true,
  //     },
  //   ],
  //   topSellingProducts: [
  //     {
  //       type: Object,
  //       required: true,
  //     },
  //   ],
  //   topReactedProducts: [
  //     {
  //       type: Object,
  //       required: true,
  //     },
  //   ],
  //   featuredCategories: [
  //     {
  //       type: Object,
  //       required: true,
  //     },
  //   ],
  created_at: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
