'use strict';

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });

  return Patient;
};
