const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PersonalInformation = sequelize.define('PersonalInformation', {
  details_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // This is a reference to another model
      key: 'user_id', // This is the column name of the referenced model
    },
    onDelete: 'CASCADE', // optional: this defines what to do when the referenced object is deleted
  },
  specialization: DataTypes.STRING,
  name: DataTypes.STRING,
  father_name: DataTypes.STRING,
  gender: DataTypes.STRING,
  cnic_no: DataTypes.STRING,
  marital_status: DataTypes.STRING,
  cell_no: DataTypes.STRING,
  nationality: DataTypes.STRING,
  dob: DataTypes.DATE,
  religion: DataTypes.STRING,
  sect: DataTypes.STRING,
  postal_address: DataTypes.STRING,
  mother_name: DataTypes.STRING,
  num_of_children: DataTypes.INTEGER,
  residential_no: DataTypes.STRING,
  permanent_address: DataTypes.STRING,
  nok_name: DataTypes.STRING,
  nok_rs: DataTypes.STRING,
  nok_contact: DataTypes.STRING,
  nok_name: DataTypes.STRING,
  how_hear: DataTypes.STRING,
}, {
  tableName: 'personal_details',
  timestamps: false
});

module.exports = PersonalInformation;
