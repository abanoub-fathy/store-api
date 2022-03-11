const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "product name is required"],
  },
  price: {
    type: Number,
    required: [true, "product price is required"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "carresa", "marcos"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Company is required"],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
