const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const HomePageContent = sequelize.define('HomePageContent', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  banners: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  pageType: {
    type: DataTypes.STRING, 
    allowNull: false,
    defaultValue: 'homepage', 
  },
});

module.exports = HomePageContent;
