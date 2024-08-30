const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const PersonalInformation = require('./PersonalInformation');
const Qualification = require('./Qualification');
const Experience = require('./Experience');
const UserReference = require('./UserReference');
const AdditionalDetails = require('./AdditionalDetails');
const Application = require('./Application');
const Employee = require('./Employee');


const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: DataTypes.STRING
}, {
  tableName: 'users',
  timestamps: false
});

// Associations
// User.hasOne(PersonalInformation, { foreignKey: 'user_id', as: 'personalInfo' });
// User.hasMany(Qualification, { foreignKey: 'user_id', as: 'qualifications' });
// User.hasMany(Experience, { foreignKey: 'user_id', as: 'experiences' });
// User.hasMany(UserReference, {
//   foreignKey: 'user_id',
//   as: 'references'
// });
// User.hasOne(AdditionalDetails, {
//   foreignKey: 'user_id',
//   as: 'additionalDetails'
// });
// User.hasOne(Application, {
//   foreignKey: 'user_id',
//   as: 'applications'
// });


module.exports = User;
