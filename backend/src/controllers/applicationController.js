// controllers/userController.js
const sequelize = require('../config/sequelize'); // Make sure you import sequelize instance
const User = require('../models/User');
const PersonalInformation = require('../models/PersonalInformation');
const Qualification = require('../models/Qualification');
const Experience = require('../models/Experience');
const UserReference = require('../models/UserReference');
const AdditionalDetails = require('../models/AdditionalDetails');
const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  const { education, experiences, references, ...data } = req.body;
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
      const user = await User.create({ email: data.email, user_type: 'applicant', avatar: photoPath }, { transaction: t });
      await PersonalInformation.create({ ...data, user_id: user.user_id }, { transaction: t });
      
      // Handle bulk creation by spreading each parsed object and adding user_id
      await Qualification.bulkCreate(parsedEducation.map(q => ({ ...q, user_id: user.user_id })), { transaction: t });
      await Experience.bulkCreate(parsedExperiences.map(e => ({ ...e, user_id: user.user_id })), { transaction: t });
      await UserReference.bulkCreate(parsedReferences.map(r => ({ ...r, user_id: user.user_id })), { transaction: t });
      await AdditionalDetails.create({ ...data, user_id: user.user_id, resume: resumePath }, { transaction: t });
      await Application.create({ user_id: user.user_id }, { transaction: t });
    });

    res.status(201).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
};
