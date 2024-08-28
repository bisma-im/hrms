const Job = require('../models/Job');

const getJobsByDepartment  = async (req, res) => {
    const { departmentId } = req.params;
    try {
        const jobs = await Job.findAll({
            where: {
              department_id: departmentId
            }
          }); 

        // Checking if no jobs were found
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found for this department' });
        }
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving jobs', error: err.message });
    }
}

module.exports = {
    getJobsByDepartment 
};