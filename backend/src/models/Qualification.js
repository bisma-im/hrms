const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Qualification = sequelize.define('Qualification', {
  qualification_id: {
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
  degree_type: DataTypes.STRING,
  duration_years: DataTypes.INTEGER,
  specialization: DataTypes.STRING,
  passing_year: DataTypes.INTEGER,
  cgpa_percentage: DataTypes.FLOAT,
  institute_name: DataTypes.STRING,
  country: DataTypes.STRING
}, {
  tableName: 'qualifications',
  timestamps: false
});

module.exports = Qualification;
