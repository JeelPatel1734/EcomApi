const mongoose = require('mongoose');

// Define booking schema
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
      photo: {
      type: String,
      required: true
    },
    birthdate: {
        type: String,
        required: true
    },
   
   address: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
    },
      phone: {
        type: String,
        required: true
    },
  
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create booking model
const profile = mongoose.model('profile', profileSchema, 'profile');

module.exports = profile;
