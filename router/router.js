const express = require("express");
const {signUpControler , getAllUsers ,getUserDetails} = require("../controler/signUpControler");
const { loginControler } = require("../controler/loginControler");
const { createDepartment, getAllDepartments, getDepartmentById, deleteDepartment, updateDepartment } = require("../controler/departmentControler");

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

module.exports = router;
