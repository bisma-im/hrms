// routes/jobRoutes.js

const express = require('express');
const router = express.Router();
const { getJobsByDepartment, fetchJobs, addJob, fetchJob } = require('../controllers/jobController'); // Adjust the path according to your project structure


router.get('/', fetchJobs);
router.get('/:jobId', fetchJob);
// Route to get jobs by department
router.get('/department/:departmentId', getJobsByDepartment);

router.post('/submit', addJob);

module.exports = router;
