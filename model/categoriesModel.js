const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  department: {
    type: String,
    ref: 'Department', // Reference to the Department model
    required: true,
  },
  // Other fields as needed
});

module.exports = mongoose.model('Category', categorySchema);
