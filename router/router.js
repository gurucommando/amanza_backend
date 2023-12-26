const express = require("express");


const {signUpControler , getAllUsers ,getUserDetails} = require("../controler/signUpControler");
const { loginControler } = require("../controler/loginControler");
const { createDepartment, getAllDepartments, getDepartmentById, deleteDepartment, updateDepartment } = require("../controler/departmentControler");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoryByDepartment } = require("../controler/categoriesControler");
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct, getProductByDepartment, getProductByCategory } = require("../controler/productControler");

const router = express.Router();


//////////////////// user ////////////////////

router.post("/signUpApi", signUpControler);
router.post('/login', loginControler);
router.get('/allUsers',getAllUsers);
router.post('/get-user-details',getUserDetails);

/////////////////// Department //////////////////////////////

router.post('/add-department',createDepartment);
router.post('/update-department',updateDepartment);
router.get('/all-department', getAllDepartments);
router.post('/get-single-department', getDepartmentById);
router.post('/delete-single-department',deleteDepartment);


// CRUD operations for categories
router.post('/add-category',createCategory);
router.post('/update-category',updateCategory);
router.get('/all-categories', getAllCategories);
router.get('/get-single-category', getCategoryById);
router.get('/get-single-categoryByDepartment', getCategoryByDepartment);
router.get('/delete-single-category',deleteCategory);


// CRUD operation for product 

router.post('/add-product',createProduct);
router.post('/update-product',updateProduct);
router.get('/all-products', getAllProducts);
router.get('/get-single-product', getProductById);
router.get('/get-single-productByDepartment', getProductByDepartment);
router.get('/get-single-productByCategory', getProductByCategory);
router.get('/delete-single-product',deleteProduct);


module.exports = router;
