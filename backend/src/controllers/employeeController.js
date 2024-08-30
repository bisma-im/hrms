const sequelize = require('../config/sequelize'); // make sure to import your configured Sequelize instance
const AdditionalDetails = require('../models/AdditionalDetails');
const Application = require('../models/Application');
const Children = require('../models/Children');
const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Job = require('../models/Job');
const PersonalInformation = require('../models/PersonalInformation');
const User = require('../models/User');
const sendEmail = require('../utils/mailService');
const crypto = require('crypto');

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
                [sequelize.col('User.PersonalInformation.name'), 'name'],
                [sequelize.col('User.PersonalInformation.gender'), 'gender'],
                [sequelize.col('User.PersonalInformation.cell_no'), 'cell_no'],
                [sequelize.col('User.email'), 'email'],
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
    console.log('inside controller');
    const { children, applicantId, ...data } = req.body;
    const parsedChildren = JSON.parse(children);

    console.log('Received applicantId:', applicantId);
    console.log('Received data:', data);

    const transaction = await sequelize.transaction();

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

            const user = applicant.User;

            // Update the user type to 'employee' and set a generated password
            user.user_type = 'employee';
            user.password = generatePassword();
            await user.save({ transaction });

            // Update the applicant's status to 'Hired'
            applicant.status = 'Hired';
            await applicant.save({ transaction });

            // Merge the existing personal details with the incoming data
            const personalDetailsData = {
                ...user.PersonalInformation.get({ plain: true }),
                ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
            };

            // Merge the existing additional details with the incoming data
            const additionalDetailsData = {
                ...user.AdditionalDetails.get({ plain: true }),
                ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''))
            };

            // Update the existing personal details
            if (user.PersonalInformation) {
                console.log('Updating personal details with:', personalDetailsData);
                await user.PersonalInformation.update(personalDetailsData, { transaction });
            }

            // Update the existing additional details
            if (user.AdditionalDetails) {
                console.log('Updating additional details with:', additionalDetailsData);
                await user.AdditionalDetails.update(additionalDetailsData, { transaction });
            }

            // Create the employee record (since it does not exist before hiring)
            const employee = await Employee.create({
                user_id: user.user_id,
                department_id: data.department_id,
                job_id: data.job_id,
                doj: data.doj || new Date(),
                reg_no: data.reg_no,
                card_no: data.card_no,
                office_letter_no: data.office_letter_no,
                date_of_promotion: data.date_of_promotion,
                present_address: data.present_address
            }, {
                transaction
            });

            // Delete existing children records to avoid duplication
            await Children.destroy({ where: { employee_id: employee.employee_id }, transaction });

            // Create new children records
            await Promise.all(parsedChildren.map(async (child) => {
                await Children.create({
                    employee_id: employee.employee_id,
                    name: child.name,
                    age: child.age
                }, { transaction });
            }));

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
            await sendEmail('bismaimran36@gmail.com', 'Welcome to Bahria University Karachi Campus', `Your email is: ${user.email} and your password is: ${user.password}`);

            // Commit the transaction
            await transaction.commit();

            // Send the response with the newly created employee details
            return res.status(201).json({
                message: 'Employee created successfully',
                data: employeeDetails
            });
        }

        await transaction.rollback();
        res.status(400).json({ message: 'Invalid request' });
    } catch (error) {
        // Rollback the transaction in case of any errors
        await transaction.rollback();
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};



module.exports = {
    getAllEmployees,
    createEmployee
};