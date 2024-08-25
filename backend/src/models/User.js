const pool = require('../config/db');

class User {
    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM users');
        return rows;
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return rows[0]; // Returns the first user or undefined
    }

    // Add other necessary methods...
}

module.exports = User;