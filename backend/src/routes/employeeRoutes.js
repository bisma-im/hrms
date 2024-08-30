const express = require('express');
const { getAllEmployees, createEmployee } = require('../controllers/employeeController');
const router = express.Router();

// Setup to handle multiple files where the names of the input fields are 'photo' and 'resume'
router.get('/', getAllEmployees);
router.post('/submit', createEmployee);

module.exports = router;
