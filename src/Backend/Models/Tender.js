const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tender = sequelize.define('Tender', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Tender;
