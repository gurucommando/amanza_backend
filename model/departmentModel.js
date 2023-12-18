const mongoose = require('mongoose');

// Define the Department Schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming the image is stored as a URL, adjust as needed
    // required: true,
  },
  // You can add more fields as needed
});

// Create the Department model
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;