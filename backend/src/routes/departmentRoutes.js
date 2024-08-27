// routes/auth.js
const express = require('express');
const router = express.Router();
const { fetchDepartments } = require('../controllers/departmentController');

router.get('/', fetchDepartments);

module.exports = router;
