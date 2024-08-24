const express = require('express');
const app = express();
const pool = require('./config/db');

// Middleware to parse JSON bodies
app.use(express.json());

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
