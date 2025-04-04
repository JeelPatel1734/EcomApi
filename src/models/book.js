const mongoose = require('mongoose');

// Define booking schema
const bookSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true
    },
    items: [
        {
            name: String,
            price: Number,
            image: String,
            quantity: Number
        }
    ],
    total: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    finalTotal: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Paid'
    },
  
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create booking model
const book = mongoose.model('book', bookSchema, 'book');

module.exports = book;
