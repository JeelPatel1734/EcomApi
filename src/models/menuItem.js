// models/product.js
const mongoose = require('mongoose');

// Create product schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,   // Image URL or path (string type)
        required: true
    },
    price: {
        type: Number,   // Product name (string type)
        required: true
    },
    category: {
        type: String,   // Product price (number type)
        required: true
    },
    
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create product model
const menuItem = mongoose.model('menuItem', menuItemSchema,'menuItem');

module.exports = menuItem;
