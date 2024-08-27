const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Experience = sequelize.define('Experience', {
  experience_id: {
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
  institution_name: DataTypes.STRING,
  position_title: DataTypes.STRING,
  from_date: DataTypes.DATE,
  to_date: DataTypes.DATE,
  total_period: DataTypes.STRING
}, {
  tableName: 'experience',
  timestamps: false
});

module.exports = Experience;
