const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const RecentActivity = sequelize.define('RecentActivity', {
  adminid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
});

module.exports = RecentActivity;
