'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User',  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING 
    },
    address: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true
  });
  return User;
};