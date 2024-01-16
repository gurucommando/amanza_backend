const Product = require("../model/productModel");
const Department = require('../model/departmentModel');
const Category = require('../model/categoriesModel');
const multer = require('multer');
// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); 

// Create a new product
const createProduct = async (req, res) => {

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'File upload error' });
          } else if (err) {
            return res.status(500).json({ message: err.message });
          }

          const { name, description, price, department, category } = req.body;
        //   console.log(req.body)
    
          const image = req.file ? req.file.buffer.toString('base64') : null; // Assuming the image is stored as base64 in this example
        
          try {
            // Check if the department exists
            const isDepartment = await Department.findById(department);
            if (!isDepartment) {
              return res.status(404).json({ message: 'Department not found' });
            }
            const isCategory = await Category.findById(category);
            if (!isCategory) {
              return res.status(404).json({ message: 'Category not found' });
            }


            // Create a new category
            const newProduct = new Product({ name, description, price, department, category, image });
            // Save the category
            const savedProduct = await newProduct.save();
            res.status(201).json({data: savedProduct , status:true});
          } catch (err) {
            res.status(400).json({ message: err.message });
    
          }
    
    })

};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('department', 'name').populate('category', 'name');
    res.json({data:products});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const productId = req.query.id;
  try {
    const product = await Product.findById(productId).populate('department', 'name').populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({data:product});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get Product by Department Id
const getProductByDepartment = async (req, res) => {
    const departmentId = req.query.id; // Access department ID from query parameter
    try {
      // Find categories that belong to the specified department
      const products = await Product.find({ department: departmentId })
      .populate({
        path: 'department',
        select: '_id name' // Select only the _id and name fields of the department
      });
    //   console.log(products)
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No Product found for the specified department' });
      }
      
      res.json({data:products , status:true});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// Get Product by Department Id
const getProductByCategory = async (req, res) => {
    const categoryId = req.query.id; // Access department ID from query parameter
    try {
      // Find categories that belong to the specified department
      const products = await Product.find({ category: categoryId })
      .populate({
        path: 'category',
        select: '_id name' // Select only the _id and name fields of the department
      });
    //   console.log(products)
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No Product found for the specified Category' });
      }
      
      res.json({data:products , status:true});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



// Update a product
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, price, departmentId, categoryId } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (departmentId) product.department = departmentId;
    if (categoryId) product.category = categoryId;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const productId = req.query.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(201).json({ message: 'Product has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByDepartment,
  getProductByCategory,
  updateProduct,
  deleteProduct,
};
