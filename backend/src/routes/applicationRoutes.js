const express = require('express');
const { submitApplication } = require('../controllers/applicationController');
const upload = require('../config/multer'); // adjust the path accordingly
const router = express.Router();

// Setup to handle multiple files where the names of the input fields are 'photo' and 'resume'
router.post('/submit', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), submitApplication);


module.exports = router;
