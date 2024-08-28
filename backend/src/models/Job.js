const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Job = sequelize.define('Job', {
    job_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employment_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: true
    },
    experience_skill: {
        type: DataTypes.STRING,
        allowNull: true
    },
    salary_range: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    published_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    published_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'job',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Job;

