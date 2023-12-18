const bodyParser = require('body-parser');
const express = require("express");


const {signUpControler , getAllUsers ,getUserDetails} = require("../controler/signUpControler");
const { loginControler } = require("../controler/loginControler");
const { createDepartment, getAllDepartments, getDepartmentById, deleteDepartment, updateDepartment } = require("../controler/departmentControler");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controler/categoriesControler");

const router = express.Router();


//////////////////// user ////////////////////

router.post("/signUpApi", signUpControler);
router.post('/login', loginControler);
router.get('/allUsers',getAllUsers);
router.post('/get-user-details',getUserDetails);


/////////////////// Department //////////////////////////////

router.get('/all-department', getAllDepartments);
router.post('/get-single-department', getDepartmentById);
router.post('/add-department',createDepartment);
router.post('/update-department',updateDepartment);
router.post('/delete-single-department',deleteDepartment);


// CRUD operations for categories
router.post('/add-category',createCategory);
router.get('/all-categories', getAllCategories);
router.get('/get-single-category', getCategoryById);
router.post('/update-category',updateCategory);
router.post('/delete-single-category',deleteCategory);

module.exports = router;
