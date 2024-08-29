// routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const { getJobsByDepartment, fetchJobs } = require('../controllers/jobController'); // Adjust the path according to your project structure

router.get('/', fetchJobs);
// Route to get jobs by department
router.get('/department/:departmentId', getJobsByDepartment);


module.exports = router;
