'use strict';

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    PatientNumber: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    nationalId: {
      type: DataTypes.STRING
    },
    bloodType: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.DOUBLE
    },
    address: {
      type: DataTypes.STRING
    },
    street: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    profilePhoto: {
      type: DataTypes.STRING
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  return Patient;
};
