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
  const departmentId = req.query.id;
  const { name, description, image } = req.body;

  try {
    const department = await Department.findById(departmentId);
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // const upload = util.promisify(uploadMiddleware(req, res)); // Assuming you've defined your multer middleware as 'uploadMiddleware'

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      }

      const { name, description  } = req.body;

      // Update department fields based on req.body
      if (name) department.name = name;
      if (description) department.description = description;

      // Check if a new image is provided in the form data and update it
      if (req.file) {
        // Assuming you're using multer for handling file uploads
        department.image = req.file.buffer.toString('base64') // Update with the new image path
      }else{
        department.image = null
      }
      
      
      const updatedDepartment = await department.save();
      res.json({ status: true, data: updatedDepartment });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({status:true ,data:departments});
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
      res.json({status:true, data:department});
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
