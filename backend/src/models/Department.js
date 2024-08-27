const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Department = sequelize.define('Department', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  department_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  head_of_department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_extension: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'department',
  timestamps: true, // This can be set to false if you want to manually handle `created_at` and `updated_at`
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Department;

