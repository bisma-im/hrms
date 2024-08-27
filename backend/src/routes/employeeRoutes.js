const express = require('express');
const { getAllEmployees } = require('../controllers/employeeController');
const router = express.Router();

// Setup to handle multiple files where the names of the input fields are 'photo' and 'resume'
router.get('/', getAllEmployees);


module.exports = router;
