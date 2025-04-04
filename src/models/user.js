// models/product.js
const mongoose = require('mongoose');

// Create product schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,   // Image URL or path (string type)
        required: true
    },
 
    password: {
        type: String,   // Product price (number type)
        required: true
    },
    
    
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create product model
const user = mongoose.model('user', userSchema,'user');

module.exports = user;
