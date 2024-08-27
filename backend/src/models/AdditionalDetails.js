const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AdditionalDetails = sequelize.define('AdditionalDetails', {
    detail_id: {
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
        }
    },
    total_qualification_years: DataTypes.INTEGER,
    category_publication: DataTypes.STRING,
    publications_count: DataTypes.INTEGER,
    number_of_projects: DataTypes.INTEGER,
    ms_phd_produced: DataTypes.INTEGER,
    consultancy_amount: DataTypes.FLOAT,
    total_fm_experience: DataTypes.FLOAT,
    total_field_experience: DataTypes.FLOAT,
    resume: DataTypes.STRING
}, {
    tableName: 'additional_details',
    timestamps: false
});

module.exports = AdditionalDetails;
