const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    image: String, // Assuming storing image path as a string
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
