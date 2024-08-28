const sequelize = require('../config/sequelize'); // make sure to import your configured Sequelize instance

exports.getAllEmployees = async (req, res) => {
    try {
        const query = `
            SELECT e.employee_id, e.doj, pd.name, pd.gender, pd.cell_no, u.email, d.department_name, j.title as job_title
            FROM employees e
            LEFT JOIN users u ON e.user_id = u.user_id
            LEFT JOIN personal_details pd ON e.user_id = pd.user_id
            LEFT JOIN department d ON e.department_id = d.department_id
            LEFT JOIN job j ON e.job_id = j.job_id
        `;
        const employees = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json({
            message: 'Employees fetched successfully',
            data: employees
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};
