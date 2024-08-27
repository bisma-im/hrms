const express = require('express');
const cors = require('cors');
const app = express();
// const pool = require('./src/config/db');
const sequelize = require('./src/config/sequelize');

// Setup CORS
app.use(cors({
  origin: 'http://localhost:3000'  // Allow your front-end URL; adjust as needed for production
}));

// Middleware to parse JSON bodies
app.use(express.json());


// Auth Routes
app.use('/api/auth', require('./src/routes/auth'));

// Department Routes
app.use('/api/departments', require('./src/routes/departmentRoutes'));

// Applicant Routes
app.use('/api/applicants', require('./src/routes/applicationRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    // Start server only if database is connected and models are synced
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
