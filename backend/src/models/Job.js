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
    description: {
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
    experience_years: {
        type: DataTypes.STRING,
        allowNull: true
    },
    salary_range: {
        type: DataTypes.STRING,
        allowNull: true
    },
    campus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vacancies: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_published: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    published_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // This is a reference to another model
            key: 'user_id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // This is a reference to another model
            key: 'user_id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'job',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Job;

