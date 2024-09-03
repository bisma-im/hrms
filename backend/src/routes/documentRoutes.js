const express = require('express');
const { submitDocument, getDocuments } = require('../controllers/documentController');
const upload = require('../config/multer'); // adjust the path accordingly
const router = express.Router();

// Setup to handle multiple files where the names of the input fields are 'photo' and 'resume'
router.get('/:userId', getDocuments);
router.post('/upload/:userId', upload.single('file'), submitDocument);

module.exports = router;
