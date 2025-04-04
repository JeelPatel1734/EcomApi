// models/product.js
const mongoose = require('mongoose');

// Create product schema
const bookingSchema = new mongoose.Schema({
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
    username: {
        type: String,   // Product price (number type)
        required: true
    },
        address: {
        type: String,   // Product price (number type)
        required: true
    },
    number: {
        type: Number,   // Product name (string type)
        required: true
    },

    
    
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create product model
const booking = mongoose.model('booking', bookingSchema,'booking');

module.exports = booking;
