// controllers/categoryController.js

const Department = require('../model/departmentModel');
const Category = require('../model/categoriesModel');
const multer = require('multer');
// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); 


// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('department', 'name');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  const categoryId = req.query.id;
  console.log(req.query)
  try {
    const category = await Category.findById(categoryId).populate('department', 'name');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a category
const createCategory = async (req, res) => {

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }
      const { name, description, department } = req.body;

      const image = req.file ? req.file.buffer.toString('base64') : null; // Assuming the image is stored as base64 in this example
    
      try {
        // Check if the department exists
        const isDepartment = await Department.findById(department);
        if (!isDepartment) {
          return res.status(404).json({ message: 'Department not found' });
        }
        // Create a new category
        const newCategory = new Category({
          name,
          description,
          image,
          department,
        });
    
        // Save the category
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }

})

  
  };

// Update a category
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description, image, department_id } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const department = await Department.findById(department_id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    category.name = name;
    category.description = description;
    category.image = image;
    category.department = department_id;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
