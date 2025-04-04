// models/product.js
const mongoose = require('mongoose');

// Create product schema
const cartSchema = new mongoose.Schema({
    email: {
        type: String,   // Image URL or path (string type)
        required: true
    },
    name: {
        type: String,   // Image URL or path (string type)
        required: true
    },
    price: {
        type: Number,   // Product name (string type)
        required: true
    },
    image: {
        type: String,   // Product price (number type)
        required: true
    },
    quantity: {
        type: Number,   // Product name (string type)
        required: true
    },
    
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create product model
const cart = mongoose.model('cart', cartSchema,'cart');

module.exports = cart;
