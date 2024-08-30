// controllers/userController.js
const sequelize = require('../config/sequelize'); // Make sure you import sequelize instance
const User = require('../models/User');
const PersonalInformation = require('../models/PersonalInformation');
const Qualification = require('../models/Qualification');
const Experience = require('../models/Experience');
const UserReference = require('../models/UserReference');
const AdditionalDetails = require('../models/AdditionalDetails');
const Application = require('../models/Application');
const Employee = require('../models/Employee');
const Job = require('../models/Job');

const submitApplication = async (req, res) => {
  const { education, experiences, references, ...data } = req.body;
  let photoName = '';
  let resumeName = '';

  // Consolidate file path extraction
  if (req.files) {
    photoName = req.files.photo?.[0]?.filename || '';
    resumeName = req.files.resume?.[0]?.filename || '';
  }

  // Parse JSON data directly without additional variables
  try {
    await sequelize.transaction(async (t) => {
      const user = await User.create({
        email: data.email,
        user_type: 'applicant',
        avatar: photoName
      }, { transaction: t });

      await PersonalInformation.create({
        ...data,
        user_id: user.user_id
      }, { transaction: t });

      const entities = {
        Qualification: JSON.parse(education),
        Experience: JSON.parse(experiences),
        UserReference: JSON.parse(references)
      };

      // Parallel processing of related entities
      await Promise.all(Object.entries(entities).map(([model, items]) => {
        return sequelize.models[model].bulkCreate(items.map(item => ({
          ...item,
          user_id: user.user_id
        })), { transaction: t });
      }));

      await AdditionalDetails.create({
        ...data,
        user_id: user.user_id,
        resume: resumeName
      }, { transaction: t });


      await Application.create({
        user_id: user.user_id,
        job_id: data.job_id,
      }, { transaction: t });

      // Construct and execute the query to get full applicant details
      const applicantData = await sequelize.query(`
        SELECT a.application_id, pd.name, u.created_at, d.department_name, a.status, a.rating, a.interview_date, j.title as job_title, ad.resume
        FROM application a
        LEFT JOIN users u ON a.user_id = u.user_id
        LEFT JOIN personal_details pd ON a.user_id = pd.user_id
        LEFT JOIN job j ON a.job_id = j.job_id
        LEFT JOIN department d ON j.department_id = d.department_id
        LEFT JOIN additional_details ad ON a.user_id = ad.user_id
        WHERE a.user_id = ${user.user_id}
      `, { type: sequelize.QueryTypes.SELECT });

      res.status(201).json({
        success: true,
        message: 'Applicant submitted successfully.',
        data: applicantData[0]  // Assume only one row is returned
      });

    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};


const getAllApplications = async (req, res) => {
  try {
    const query = `
          SELECT u.user_id, a.application_id, pd.name, u.created_at, d.department_name, a.status, a.rating, a.interview_date, j.title as job_title, ad.resume
          FROM application a
          LEFT JOIN users u ON a.user_id = u.user_id
          LEFT JOIN personal_details pd ON a.user_id = pd.user_id
          LEFT JOIN job j ON a.job_id = j.job_id
          LEFT JOIN department d ON j.department_id = d.department_id
          LEFT JOIN additional_details ad ON a.user_id = ad.user_id
      `;
    const applicants = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

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
    const applicant = await Application.findByPk(applicantId);
    const user = await User.findByPk(applicant.user_id);
    const qualifications = await Qualification.findAll({
      where: {
        user_id: applicant.user_id
      }
    });
    const experience = await Experience.findAll({
      where: {
        user_id: applicant.user_id
      }
    });
    const userReferences = await UserReference.findAll({
      where: {
        user_id: applicant.user_id
      }
    });
    const personalInfo = await PersonalInformation.findOne({
      where: {
        user_id: applicant.user_id
      }
    });    
    
    const additionalDetails = await AdditionalDetails.findOne({
      where: {
        user_id: applicant.user_id
      }
    });
    const job = await Job.findByPk(applicant.job_id);

    const response = {
      campus: applicant.campus || 'karachi',
      department_id: job.department_id || '',
      specialization: applicant.specialization || '',
      name: personalInfo.name || '',
      job_id: job.job_id || '',
      father_name: personalInfo?.father_name || '',
      gender: personalInfo?.gender || '',
      cnic_no: personalInfo?.cnic_no || '',
      marital_status: personalInfo?.marital_status || '',
      email: user.email || '',
      photo: user?.avatar || null,
      cell_no: personalInfo?.cell_no || '',
      religion: personalInfo?.religion || '',
      dob: personalInfo?.dob || '',
      sect: personalInfo?.sect || '',
      nationality: personalInfo?.nationality || '',
      postal_address: personalInfo?.postal_address || '',
      permanent_address: personalInfo?.postal_address || '',
      present_address: personalInfo?.postal_address || '',
      how_hear: personalInfo.how_hear || '',
      total_qualification_years: additionalDetails?.total_qualification_years || '',
      publications_count: additionalDetails?.publications_count || '',
      category_publication: additionalDetails?.category_publication || '',
      consultancy_amount: additionalDetails?.consultancy_amount || '',
      ms_phd_produced: additionalDetails?.ms_phd_produced || '',
      number_of_projects: additionalDetails?.number_of_projects || '',
      total_fm_experience: additionalDetails?.total_fm_experience || '',
      total_field_experience: additionalDetails?.total_field_experience || '',
      references: userReferences.map(reference => ({
        name: reference.reference_name || '',
        designation: reference.reference_designation || '',
        contact: reference.reference_contact || ''
      })),
      education: qualifications.map(qualification => ({
        degree_type: qualification.degree_type || '',
        duration_years: qualification.duration_years || '',
        specialization: qualification.specialization || '',
        passing_year: qualification.passing_year || '',
        cgpa_percentage: qualification.cgpa_percentage || '',
        institute_name: qualification.institute_name || '',
        country: qualification.country || ''
      })),
      experiences: experience.map(exp => ({
        institution_name: exp.institution_name || '',
        position_title: exp.position_title || '',
        from_date: exp.from_date || '',
        to_date: exp.to_date || '',
        total_period: exp.total_period || ''
      })),
      children: [{ name: '', age: '' }]
    };

    res.json(response);

  } catch (error) {
    console.error('Error fetching applicant details:', error);
    throw error;  // Rethrowing the error to be handled by the calling function
  }
}

const updateApplicantDetails = async (req, res) => {
  const { applicantId } = req.params;
  const { interview_date, status, rating } = req.body;

  try {
    // Find the application by ID
    const application = await Application.findByPk(applicantId);

    if (!application) {
      return res.status(404).send({ message: 'Application not found' });
    }

    // Update fields if they are provided
    if (interview_date) application.interview_date = interview_date;
    if (status) application.status = status;
    if (rating) application.rating = rating;

    // Save the updated application
    const updatedApplication = await application.save();

    res.status(200).send(updatedApplication);
  } catch (error) {
    res.status(500).send({ message: 'Error updating application', error: error.message });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  fetchApplicantDetails,
  updateApplicantDetails
};