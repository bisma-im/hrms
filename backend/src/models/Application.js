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
        values: ['New', 'Shortlisted', 'Rejected', 'Under Review', 'Interview Scheduled', 'Offer Made', 'Hired'], 
        defaultValue: 'New', 
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
        }
    },    
    interview_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
    // Add additional fields if necessary
}, {
    tableName: 'application',
    timestamps: false
});

module.exports = Application;
