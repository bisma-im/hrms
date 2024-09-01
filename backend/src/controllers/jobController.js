const Department = require('../models/Department');
const Job = require('../models/Job');
const Application = require('../models/Application');
const sequelize = require('../config/sequelize');

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

const fetchJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            attributes: ['job_id'],
            include: [
                {
                    model: Department,
                    attributes: ['department_name']
                },
                {
                    model: Application,
                    attributes: [],
                    where: {
                        status: 'new'
                    },
                    required: false
                }
            ],
            attributes: {
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('Applications.application_id')),
                        'new_applications_count'
                    ]
                ]
            },
            group: ['Job.job_id', 'Department.department_id'],
            order: [['job_id', 'ASC']]
        });
        
        // Count applications separately if needed for complex queries
        for (const job of jobs) {
            const newApplicationsCount = await Application.count({
                where: {
                    job_id: job.job_id,
                    status: 'new'
                }
            });
            job.new_applications_count = newApplicationsCount;
        }
        
        // Checking if no departments were found
        if (jobs.length === 0) { // Adjusted check for an empty array
            return res.status(404).json({ message: "No jobs found" });
        }

        res.status(200).json(jobs);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addJob = async (req, res) => {
    console.log(req.body)
    const { 
        title, 
        department_id, 
        description,
        employment_type, 
        qualification, 
        experience_years, 
        salary_range, 
        campus, 
        vacancies, 
        is_published, 
        user_id 
    } = req.body;

    try {
        const job = await Job.create({
            title,
            department_id,
            description,
            employment_type,
            qualification,
            experience_years,
            salary_range,
            campus,
            vacancies,
            is_published,
            published_by: is_published === 'y' ? user_id : null,
            created_by: user_id,
            created_at: new Date(),
        });

        return res.status(201).json({ success: true, data: job });
    } catch (error) {
        console.error('Error creating job:', error);
        return res.status(500).json({ success: false, message: 'Failed to create job.' });
    }
}

const fetchJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findOne({
            where: { job_id: jobId }, 
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        return res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job details:', error);
        return res.status(500).json({ message: 'Failed to fetch job details' });
    }
}

module.exports = {
    getJobsByDepartment,
    fetchJobs,
    addJob,
    fetchJob
};