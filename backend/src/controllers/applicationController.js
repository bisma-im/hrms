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

exports.submitApplication = async (req, res) => {
  const { education, experiences, references, formType, ...data } = req.body;
  let photoPath = '';
  let resumePath = '';

  // Extract file paths if available
  if (req.files && req.files.photo && req.files.photo.length > 0) {
    photoPath = req.files.photo[0].path;
  }
  if (req.files && req.files.resume && req.files.resume.length > 0) {
    resumePath = req.files.resume[0].path;
  }

  // Parse JSON data if they are passed as JSON strings
  const parsedEducation = JSON.parse(education);
  const parsedExperiences = JSON.parse(experiences);
  const parsedReferences = JSON.parse(references);

  try {
    // Perform all operations inside a transaction
    await sequelize.transaction(async (t) => {
      const user = await User.create({ email: data.email, user_type: formType, avatar: photoPath }, { transaction: t });
      await PersonalInformation.create({
        name: data.name,
        father_name: data.father_name,
        dob: data.dob,
        specialization: data.specialization,
        gender: data.gender,
        cnic_no: data.cnic_no,
        marital_status: data.marital_status,
        cell_no: data.cell_no,
        nationality: data.nationality,
        religion: data.religion,
        sect: data.sect,
        postal_address: data.postal_address,
        how_hear: data.how_hear,
        user_id: user.user_id
      }, { transaction: t });

      // Handle bulk creation by spreading each parsed object and adding user_id
      await Qualification.bulkCreate(parsedEducation.map(q => ({ ...q, user_id: user.user_id })), { transaction: t });
      await Experience.bulkCreate(parsedExperiences.map(e => ({ ...e, user_id: user.user_id })), { transaction: t });
      await UserReference.bulkCreate(parsedReferences.map(r => ({ ...r, user_id: user.user_id })), { transaction: t });

      await AdditionalDetails.create({
        total_qualification_years: data.total_qualification_years,
        category_publication: data.category_publication,
        publications_count: data.publications_count,
        number_of_projects: data.number_of_projects,
        ms_phd_produced: data.ms_phd_produced,
        consultancy_amount: data.consultancy_amount,
        total_fm_experience: data.total_fm_experience,
        total_field_experience: data.total_field_experience,
        user_id: user.user_id,
        resume: resumePath
      }, { transaction: t });

      if (formType === 'applicant') {
        await Application.create({ user_id: user.user_id }, { transaction: t });
        res.status(201).json({ success: true, message: 'Application submitted successfully.' });

      }
      else if (formType === 'employee') {
        await Employee.create({ 
          department_id: data.department_id,
          job_id: data.job_id,
          doj: data.doj,
          user_id: user.user_id
        }, { transaction: t });
        res.status(201).json({ success: true, message: 'Employee submitted successfully.' });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};
