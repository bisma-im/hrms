const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Application = sequelize.define('Application', {
    application_id: {
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
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'job', // This should match the table name
            key: 'job_id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved', 'rejected', 'under_review'], 
        defaultValue: 'pending', 
        allowNull: false
    }
    // Add additional fields if necessary
}, {
    tableName: 'application',
    timestamps: false
});

module.exports = Application;
