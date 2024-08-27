const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/uploads'); // Ensure this directory exists or is created on startup
    },
    filename: function(req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);
            cb(null, buf.toString('hex') + path.extname(file.originalname)); // Append file extension
        });
    }
});

const upload = multer({ storage: storage });

module.exports = upload;