const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Documents = sequelize.define('Documents', {
    document_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    document_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    uploaded_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Pending', 'Approved', 'Rejected'],
        defaultValue: 'Pending'
    },
    dimensions: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // This should match the table name
            key: 'user_id'
        }
    },
}, {
    tableName: 'documents',
    timestamps: false
});

module.exports = Documents;
