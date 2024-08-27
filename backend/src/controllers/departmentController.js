const Department = require('../models/Department');

const fetchDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll(); // Uses the Sequelize findAll method

        // Checking if no departments were found
        if (departments.length === 0) { // Adjusted check for an empty array
            return res.status(404).json({ message: "No departments found" });
        }

        res.status(200).json({
            message: "Fetching departments successful",
            departments: departments
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    fetchDepartments
};