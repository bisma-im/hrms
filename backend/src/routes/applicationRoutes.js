const express = require('express');
const { submitApplication, getAllApplications, fetchApplicantDetails, updateApplicantDetails } = require('../controllers/applicationController');
const upload = require('../config/multer'); // adjust the path accordingly
const router = express.Router();

// Setup to handle multiple files where the names of the input fields are 'photo' and 'resume'
router.post('/submit', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), submitApplication);
router.get('/', getAllApplications);
router.get('/:applicantId', fetchApplicantDetails);
router.put('/:applicantId', updateApplicantDetails);

module.exports = router;
