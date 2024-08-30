// Import all models
const User = require('./User');
const PersonalInformation = require('./PersonalInformation');
const Qualification = require('./Qualification');
const Experience = require('./Experience');
const UserReference = require('./UserReference');
const AdditionalDetails = require('./AdditionalDetails');
const Application = require('./Application');
const Employee = require('./Employee');
const Job = require('./Job');
const Department = require('./Department');
const Children = require('./Children');

// Associations
Employee.hasMany(Children, { foreignKey: 'employee_id', as: 'Children', onDelete: 'CASCADE' });
Children.belongsTo(Employee, { foreignKey: 'employee_id', as: 'Employee', onDelete: 'CASCADE' });
// Define associations
User.hasOne(PersonalInformation, { foreignKey: 'user_id', as: 'PersonalInformation', onDelete: 'CASCADE' });
PersonalInformation.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasMany(Qualification, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Qualification.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasMany(Experience, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Experience.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasMany(UserReference, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserReference.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasOne(AdditionalDetails, { foreignKey: 'user_id', as: 'AdditionalDetails', onDelete: 'CASCADE' });
AdditionalDetails.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasMany(Application, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Application.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasOne(Employee, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Employee.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Employee.belongsTo(Department, { foreignKey: 'department_id', onDelete: 'CASCADE' });
Department.hasMany(Employee, { foreignKey: 'department_id', onDelete: 'CASCADE' });

Employee.belongsTo(Job, { foreignKey: 'job_id', onDelete: 'CASCADE' });
Job.hasMany(Employee, { foreignKey: 'job_id', onDelete: 'CASCADE' });

Job.belongsTo(Department, { foreignKey: 'department_id', onDelete: 'CASCADE' });
Department.hasMany(Job, { foreignKey: 'department_id', onDelete: 'CASCADE' });

Application.belongsTo(Job, { foreignKey: 'job_id' });
Job.hasMany(Application, { foreignKey: 'job_id' });

module.exports = {
  User,
  PersonalInformation,
  Qualification,
  Experience,
  UserReference,
  AdditionalDetails,
  Application,
  Employee,
  Job,
  Department
};
