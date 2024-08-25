const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./src/config/db');

// Setup CORS
app.use(cors({
  origin: 'http://localhost:3000'  // Allow your front-end URL; adjust as needed for production
}));

// Middleware to parse JSON bodies
app.use(express.json());


// Auth Routes
app.use('/api/auth', require('./src/routes/auth'));


// Example route
app.get('/', async (req, res) => {
  // res.send('Hello, PERN stack!');
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Other routes
// app.use('/api', require('./routes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
