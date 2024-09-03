const sequelize = require('../config/sequelize'); // make sure to import your configured Sequelize instance
const AdditionalDetails = require('../models/AdditionalDetails');
const Application = require('../models/Application');
const Children = require('../models/Children');
const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Job = require('../models/Job');
const PersonalInformation = require('../models/PersonalInformation');
const User = require('../models/User');
const Experience = require('../models/Experience');
const Qualification = require('../models/Qualification');
const sendEmail = require('../utils/mailService');
const crypto = require('crypto');
const { Op, Sequelize } = require('sequelize');
const { log } = require('console');

function generatePassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:",.<>?';
    let password = '';
    const randomBytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
        password += charset[randomBytes[i] % charset.length];
    }
    return password;
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            attributes: [
                'employee_id',
                'doj',
                'user_id',
                [sequelize.col('User.PersonalInformation.name'), 'name'],
                [sequelize.col('User.PersonalInformation.gender'), 'gender'],
                [sequelize.col('User.PersonalInformation.cell_no'), 'cell_no'],
                [sequelize.col('User.email'), 'email'],
                [sequelize.col('User.avatar'), 'avatar'],
                [sequelize.col('Department.department_name'), 'department_name'],
                [sequelize.col('Job.title'), 'job_title'],
                [sequelize.col('User.AdditionalDetails.resume'), 'resume'],
            ],
            include: [
                {
                    model: User,
                    attributes: [], // We only need the email attribute and other related data via join
                    include: [
                        {
                            model: PersonalInformation,
                            as: 'PersonalInformation',
                            attributes: [] // Attributes fetched directly via col
                        },
                        {
                            model: AdditionalDetails,
                            as: 'AdditionalDetails',
                            attributes: [] // Attributes fetched directly via col
                        }
                    ]
                },
                {
                    model: Department,
                    attributes: [] // Attributes fetched directly via col
                },
                {
                    model: Job,
                    attributes: [] // Attributes fetched directly via col
                }
            ],
            raw: true // Return plain JavaScript objects instead of Sequelize instances
        });

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


const createEmployee = async (req, res) => {
    const { children, applicantId, ...data } = req.body;
    const parsedChildren = JSON.parse(children);


    let photoName = '';
    // Consolidate file path extraction
    if (req.files) {
        photoName = req.files.photo?.[0]?.filename || '';
    }

    const transaction = await sequelize.transaction();
    let user, employee, personalDetailsData, additionalDetailsData;
    try {
        if (applicantId) {
            // Find the applicant and associated user
            const applicant = await Application.findOne({
                where: { application_id: applicantId },
                include: [{
                    model: User,
                    include: [
                        { model: PersonalInformation, as: 'PersonalInformation' },
                        { model: AdditionalDetails, as: 'AdditionalDetails' }
                    ]
                }],
                transaction
            });

            if (!applicant) {
                await transaction.rollback();
                return res.status(404).json({ message: 'Applicant not found' });
            }

            user = applicant.User;

            // Update the user type to 'employee' and set a generated password
            user.user_type = 'employee';
            user.password = generatePassword();
            await user.save({ transaction });

            // Update the applicant's status to 'Hired'
            applicant.status = 'Hired';
            await applicant.save({ transaction });

            // Merge the existing personal details with the incoming data
            personalDetailsData = {
                ...user.PersonalInformation.get({ plain: true }),
                ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
            };

            // Merge the existing additional details with the incoming data
            additionalDetailsData = {
                ...user.AdditionalDetails.get({ plain: true }),
                ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
            };

            // Update the existing personal details
            if (user.PersonalInformation) {
                await user.PersonalInformation.update(personalDetailsData, { transaction });
            }

            // Update the existing additional details
            if (user.AdditionalDetails) {
                await user.AdditionalDetails.update(additionalDetailsData, { transaction });
            }

        } else {
            // Create a new user
            user = await User.create({
                email: data.email,
                password: generatePassword(),
                user_type: 'employee',
                avatar: photoName
            }, { transaction });

            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ message: 'user not created' });
            }

            // Create personal details
            personalDetailsData = {
                ...data,  // assuming all personal details are provided in the data
                user_id: user.user_id,
            };
            const personalDetails = await PersonalInformation.create(personalDetailsData, { transaction });

            // Create additional details
            additionalDetailsData = {
                ...data,  // assuming all additional details are provided in the data
                user_id: user.user_id,
            };

            const additionalDetails = await AdditionalDetails.create(additionalDetailsData, { transaction });
        }

        // Create the employee record (since it does not exist before hiring)
        employee = await Employee.create({
            user_id: user.user_id,
            department_id: data.department_id,
            job_id: data.job_id,
            doj: data.doj || new Date(),
            reg_no: data.reg_no,
            card_no: data.card_no,
            office_letter_no: data.office_letter_no,
            present_address: data.present_address,
            start_working_hr: data.start_working_hr,
            end_working_hr: data.end_working_hr
        }, {
            transaction
        });

        // Filter out any children objects that don't have valid name or age
        const validChildren = parsedChildren.filter(child => child.name && child.age);

        if (validChildren.length > 0) {
            // Delete existing children records to avoid duplication
            await Children.destroy({ where: { employee_id: employee.employee_id }, transaction });

            // Create new children records
            await Promise.all(validChildren.map(async (child) => {
                await Children.create({
                    employee_id: employee.employee_id,
                    name: child.name,
                    age: child.age
                }, { transaction });
            }));
        }

        // Fetch the complete employee details after creation
        const employeeDetails = await Employee.findOne({
            where: { employee_id: employee.employee_id },
            attributes: [
                'employee_id',
                'doj',
                [sequelize.col('User.PersonalInformation.name'), 'name'],
                [sequelize.col('User.PersonalInformation.gender'), 'gender'],
                [sequelize.col('User.PersonalInformation.cell_no'), 'cell_no'],
                [sequelize.col('User.email'), 'email'],
                [sequelize.col('Job.title'), 'job_title'],
                [sequelize.col('User.AdditionalDetails.resume'), 'resume'],
            ],
            include: [
                {
                    model: User,
                    attributes: [],
                    include: [
                        {
                            model: PersonalInformation,
                            as: 'PersonalInformation',
                            attributes: []
                        },
                        {
                            model: AdditionalDetails,
                            as: 'AdditionalDetails',
                            attributes: []
                        }
                    ]
                },
                {
                    model: Department,
                    attributes: []
                },
                {
                    model: Job,
                    attributes: [],
                    include: [
                        { model: Department, attributes: ['department_name'] }
                    ]
                }
            ],
            transaction,
            raw: true
        });

        // Send welcome email to new employee
        await sendEmail(data.email, 'Welcome to Bahria University Karachi Campus', `Your email is: ${user.email} and your password is: ${user.password}`);

        // Commit the transaction
        await transaction.commit();

        // Send the response with the newly created employee details
        return res.status(201).json({
            message: 'Employee created successfully',
            data: employeeDetails
        });
    } catch (error) {
        // Rollback the transaction in case of any errors
        await transaction.rollback();
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};

const fetchEmployeeDetails = async (req, res) => {
    console.log('inside controller')
    const { userId } = req.params;
    try {
        const employee = await Employee.findOne({
            attributes: ['employee_id', 'doj', 'reg_no', 'salary'],
            where: { user_id: userId },
            include: [
                {
                    model: User,
                    attributes: ['avatar', 'email'],
                    include: [
                        {
                            model: PersonalInformation,
                            as: 'PersonalInformation',
                            attributes: ['name', 'dob', 'gender', 'cell_no', 'postal_address', 'marital_status', 'cnic_no', 'nationality']
                        },
                        {
                            model: Experience,
                            attributes: ['position_title', 'to_date'],
                            required: false,  // Left join to handle users without experience
                            where: {
                                to_date: {
                                    [Op.in]: Sequelize.literal(`(
                                        SELECT MAX("to_date")
                                        FROM "experience" AS "Experience"
                                        WHERE "Experience"."user_id" = "User"."user_id"
                                    )`)
                                }
                            }
                        },
                        {
                            model: Qualification,
                            attributes: ['degree_type', 'specialization', 'passing_year', 'cgpa_percentage', 'institute_name']
                        },
                        {
                            model: AdditionalDetails,
                            as: 'AdditionalDetails',
                            attributes: ['resume']
                        },
                    ]
                },
                {
                    model: Job,
                    attributes: ['title'],
                },
                {
                    model: Department,
                    attributes: ['department_name']
                }
            ]
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        const response = {
            avatar: employee.User.avatar,
            email: employee.User.email,
            name: employee.User.PersonalInformation.name,
            job_title: employee.Job.title,
            employee_id: employee.employee_id,  // Employee Code
            dob: employee.User.PersonalInformation.dob, // From PersonalInformation
            gender: employee.User.PersonalInformation.gender, // From PersonalInformation
            reg_no: employee.reg_no, // User status
            department_name: employee.Department.department_name,
            doj: employee.doj, // Date of Joining
            cell_no: employee.User.PersonalInformation.cell_no,
            address: employee.User.PersonalInformation.postal_address,
            marital_status: employee.User.PersonalInformation.marital_status,
            cnic_no: employee.User.PersonalInformation.cnic_no,
            nationality: employee.User.PersonalInformation.nationality,
            salary: employee.salary,
            previous_position: employee.User.Experiences.length > 0 ? employee.User.Experiences[0].position_title : 'No experience found',
            qualifications: employee.User.Qualifications.map(q => q.dataValues),
            resume: employee.User.AdditionalDetails.resume
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching employee details:', error);
        return res.status(500).json({ message: 'Error fetching employee details', error: error.message });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    fetchEmployeeDetails
};