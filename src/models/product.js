// models/product.js
const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
    product_image: {
        type: String,   // Image URL or path (string type)
        required: true
    },
    product_name: {
        type: String,   // Product name (string type)
        required: true
    },
    product_price: {
        type: Number,   // Product price (number type)
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create product model
const Product = mongoose.model('Product', productSchema,'Product');

module.exports = Product;
