const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Employee = sequelize.define('Employee', {
    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // This should match the table name
            key: 'user_id'
        },
        onDelete: 'CASCADE'
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'department', // This should match the table name
            key: 'department_id'
        },
        onDelete: 'CASCADE'
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'job', // This should match the table name
            key: 'job_id'
        },
        onDelete: 'CASCADE'
    },
    doj: {
        type: DataTypes.DATE,
        defaultValue: () => new Date().toISOString().slice(0, 10),
        allowNull: false
    }
    // Add additional fields if necessary
}, {
    tableName: 'employees',
    timestamps: false
});

module.exports = Employee;
