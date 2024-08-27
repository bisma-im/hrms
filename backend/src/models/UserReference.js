const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserReference = sequelize.define('UserReference', {
    reference_id: {
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
    reference_name: DataTypes.STRING,
    reference_designation: DataTypes.STRING,
    reference_contact: DataTypes.STRING
}, {
    tableName: 'user_reference',
    timestamps: false
});

module.exports = UserReference;
