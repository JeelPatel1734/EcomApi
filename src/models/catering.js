const mongoose = require('mongoose');

// Create booking schema
const cateringSchema = new mongoose.Schema({
    location: { type: String, required: true },
    eventType: { type: String, required: true },
    guests: { type: Number, required: true },
    requirements: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
}, { timestamps: true });

// Create booking model
const Catering = mongoose.model('Catering', cateringSchema);

module.exports = Catering;
