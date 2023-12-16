// controllers/departmentController.js

const Department = require("../model/departmentModel");
const multer = require('multer');

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // 'image' should match the field name in your form

// Create a new department
const createDepartment = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    const { name, description } = req.body;
    const image = req.file ? req.file.buffer.toString('base64') : null; // Assuming the image is stored as base64 in this example

    const department = new Department({ name, description, image });

    try {
      const newDepartment = await department.save();
      res.status(201).json({data:newDepartment , status:"success"});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

// Update a department
const updateDepartment = async (req, res) => {
  const department_id  = req.body.id;

  try {
    const department = await Department.findById(department_id);
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    // Update department fields based on req.body
    if (req.body.name) department.name = req.body.name;
    if (req.body.description) department.description = req.body.description;
    // Add other fields to update as needed

    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({data:departments});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  
  // Get department by ID
  const getDepartmentById = async (req, res) => {
    const  department_id  = req.body.id;
    try {
      const department = await Department.findById(department_id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json({data:department});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Delete a department
const deleteDepartment = async (req, res) => {
  const department_id  = req.body.id;
  try {
    const department = await Department.findByIdAndDelete(department_id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(201).json({ message: 'Department has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
