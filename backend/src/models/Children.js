const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Children = sequelize.define('Children', {
    child_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees', // This references the 'employees' table
            key: 'employee_id'
        },
        onDelete: 'CASCADE' // If an employee is deleted, delete their children records too
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'children',
    timestamps: false
});

module.exports = Children;
