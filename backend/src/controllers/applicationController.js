// controllers/userController.js
const sequelize = require('../config/sequelize'); // Make sure you import sequelize instance
const { Op } = require('sequelize');
const User = require('../models/User');
const PersonalInformation = require('../models/PersonalInformation');
const Qualification = require('../models/Qualification');
const Experience = require('../models/Experience');
const UserReference = require('../models/UserReference');
const AdditionalDetails = require('../models/AdditionalDetails');
const Application = require('../models/Application');
const Department = require('../models/Department');
const Job = require('../models/Job');

const submitApplication = async (req, res) => {
  const { education, experiences, references, ...data } = req.body;
  let photoName = '';
  let resumeName = '';

  console.log('education: ', education);
  console.log('experiences: ', experiences);
  console.log('references: ', references);
  console.log('data: ', data);

  // Consolidate file path extraction
  if (req.files) {
    photoName = req.files.photo?.[0]?.filename || '';
    resumeName = req.files.resume?.[0]?.filename || '';
  }

  try {
    await sequelize.transaction(async (t) => {
      // Create the user
      const user = await User.create({
        email: data.email,
        user_type: 'applicant',
        avatar: photoName
      }, { transaction: t });

      // Create personal information
      await PersonalInformation.create({
        ...data,
        user_id: user.user_id
      }, { transaction: t });

      // Process related entities (Qualifications, Experiences, References)
      const entities = {
        Qualification: JSON.parse(education),
        Experience: JSON.parse(experiences),
        UserReference: JSON.parse(references)
      };

      await Promise.all(Object.entries(entities).map(([model, items]) => {
        return sequelize.models[model].bulkCreate(items.map(item => ({
          ...item,
          user_id: user.user_id
        })), { transaction: t });
      }));

      // Create additional details
      await AdditionalDetails.create({
        ...data,
        user_id: user.user_id,
        resume: resumeName
      }, { transaction: t });

      // Create application
      const application = await Application.create({
        user_id: user.user_id,
        job_id: data.job_id,
      }, { transaction: t });

      // Fetch the newly created applicant's details using Sequelize associations
      const applicantData = await Application.findOne({
        where: { application_id: application.application_id },
        include: [
          {
            model: User,
            attributes: ['created_at'],
            include: [
              { model: PersonalInformation, as: 'PersonalInformation', attributes: ['name'] },
              { model: AdditionalDetails, as: 'AdditionalDetails', attributes: ['resume'] }
            ]
          },
          {
            model: Job,
            attributes: ['title'],
            include: [
              { model: Department, attributes: ['department_name'] }
            ]
          }
        ],
        attributes: ['application_id', 'status', 'rating', 'interview_date'],
        transaction: t
      });

      // Structure the response data
      const response = {
        application_id: applicantData.application_id,
        name: applicantData.User.PersonalInformation.name,
        created_at: applicantData.User.created_at,
        department_name: applicantData.Job.Department.department_name,
        status: applicantData.status,
        rating: applicantData.rating,
        interview_date: applicantData.interview_date,
        job_title: applicantData.Job.title,
        resume: applicantData.User.AdditionalDetails.resume
      };

      res.status(201).json({
        success: true,
        message: 'Applicant submitted successfully.',
        data: response
      });
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};



const getAllApplications = async (req, res) => {
  try {
    const applicants = await Application.findAll({
      where: {
        status: {
          [Op.ne]: 'Hired'
        }
      },
      attributes: [
        'application_id',
        'status',
        'rating',
        'interview_date',
        [sequelize.col('User.user_id'), 'user_id'],
        [sequelize.col('User.created_at'), 'created_at'],
        [sequelize.col('User.PersonalInformation.name'), 'name'],
        [sequelize.col('Job.title'), 'job_title'],
        [sequelize.col('Job.Department.department_name'), 'department_name'],
        [sequelize.col('User.AdditionalDetails.resume'), 'resume']
      ],
      include: [
        {
          model: User,
          attributes: [],
          include: [
            {
              model: PersonalInformation,
              as: 'PersonalInformation',
              attributes: [],
            },
            {
              model: AdditionalDetails,
              as: 'AdditionalDetails',
              attributes: []
            }
          ]
        },
        {
          model: Job,
          attributes: [],
          include: [
            {
              model: Department,
              attributes: []
            }
          ]
        }
      ],
      raw: true
    });

    if (applicants.length === 0) {
      return res.status(404).json({ message: 'No applicants found' });
    }

    res.status(200).json({
      message: 'Applicants fetched successfully',
      data: applicants
    });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};


const fetchApplicantDetails = async (req, res) => {
  const { applicantId } = req.params;

  try {
    // Fetch all related data in a single query using `include`
    const applicant = await Application.findOne({
      where: { application_id: applicantId },
      include: [
        {
          model: User,
          include: [
            { model: PersonalInformation, as: 'PersonalInformation' },
            { model: Qualification },
            { model: Experience },
            { model: UserReference },
            { model: AdditionalDetails, as: 'AdditionalDetails' }
          ]
        },
        {
          model: Job,
          include: [{ model: Department }]
        }
      ]
    });

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    const user = applicant.User;
    const personalInfo = user?.PersonalInformation;
    const additionalDetails = user?.AdditionalDetails;
    const job = applicant.Job;

    const response = {
      campus: applicant.campus || 'karachi',
      department_id: job?.department_id || '',
      specialization: applicant.specialization || '',
      name: personalInfo?.name || '',
      job_id: job?.job_id || '',
      father_name: personalInfo?.father_name || '',
      gender: personalInfo?.gender || '',
      cnic_no: personalInfo?.cnic_no || '',
      marital_status: personalInfo?.marital_status || '',
      email: user?.email || '',
      photo: user?.avatar || null,
      cell_no: personalInfo?.cell_no || '',
      religion: personalInfo?.religion || '',
      dob: personalInfo?.dob || '',
      sect: personalInfo?.sect || '',
      nationality: personalInfo?.nationality || '',
      postal_address: personalInfo?.postal_address || '',
      permanent_address: personalInfo?.postal_address || '',
      present_address: personalInfo?.postal_address || '',
      how_hear: personalInfo?.how_hear || '',
      total_qualification_years: additionalDetails?.total_qualification_years || '',
      publications_count: additionalDetails?.publications_count || '',
      category_publication: additionalDetails?.category_publication || '',
      consultancy_amount: additionalDetails?.consultancy_amount || '',
      ms_phd_produced: additionalDetails?.ms_phd_produced || '',
      number_of_projects: additionalDetails?.number_of_projects || '',
      total_fm_experience: additionalDetails?.total_fm_experience || '',
      total_field_experience: additionalDetails?.total_field_experience || '',
      references: user?.UserReferences.map(reference => ({
        name: reference.reference_name || '',
        designation: reference.reference_designation || '',
        contact: reference.reference_contact || ''
      })) || [],
      education: user?.Qualifications.map(qualification => ({
        degree_type: qualification.degree_type || '',
        duration_years: qualification.duration_years || '',
        specialization: qualification.specialization || '',
        passing_year: qualification.passing_year || '',
        cgpa_percentage: qualification.cgpa_percentage || '',
        institute_name: qualification.institute_name || '',
        country: qualification.country || ''
      })) || [],
      experiences: user?.Experiences.map(exp => ({
        institution_name: exp.institution_name || '',
        position_title: exp.position_title || '',
        from_date: exp.from_date || '',
        to_date: exp.to_date || '',
        total_period: exp.total_period || ''
      })) || [],
      children: [{ name: '', age: '' }]  // Placeholder as no child data is included in this function
    };

    res.json(response);

  } catch (error) {
    console.error('Error fetching applicant details:', error);
    res.status(500).json({ error: 'An error occurred while fetching applicant details' });
  }
};


const updateApplicantDetails = async (req, res) => {
  const { applicantId } = req.params;
  const { interview_date, status, rating } = req.body;

  try {
    // Build an update object only with the fields that are not undefined
    const updateFields = {};
    if (interview_date !== undefined) updateFields.interview_date = interview_date;
    if (status !== undefined) updateFields.status = status;
    if (rating !== undefined) updateFields.rating = rating;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({ message: 'No valid fields provided for update' });
    }

    // Update the application directly
    const [updated, [updatedApplication]] = await Application.update(updateFields, {
      where: { application_id: applicantId },
      returning: true, // Ensures the updated row is returned
      individualHooks: true // Ensure hooks are run if defined
    });

    if (updated) {
      res.status(200).send(updatedApplication);
    } else {
      res.status(404).send({ message: 'Application not found' });
    }
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).send({ message: 'Error updating application', error: error.message });
  }
};


module.exports = {
  submitApplication,
  getAllApplications,
  fetchApplicantDetails,
  updateApplicantDetails
};