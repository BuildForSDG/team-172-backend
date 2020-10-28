'use strict';

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { isValidPhoneNumber } = require('../validator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      UserNumber: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [0, 255],
            msg: 'First Name too long.'
          },
          notNull: {
            msg: 'First Name is required.'
          },
          notEmpty: {
            msg: 'First Name is required.'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [0, 255],
            msg: 'Last Name too long.'
          },
          notNull: {
            msg: 'Last Name is required.'
          },
          notEmpty: {
            msg: 'Last Name is required.'
          }
        }
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
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: 'Weight must be an integer number.'
          }
        }
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address already registered.'
        },
        validate: {
          notNull: {
            msg: 'Email address is required.'
          },
          isEmail: {
            msg: 'Invalid email address.'
          },
          len: {
            args: [0, 255],
            msg: 'Email address too long.'
          },
          async isUnique(value) {
            try {
              const user = await User.findOne({
                where: {
                  email: {
                    [Op.eq]: value
                  },
                  id: {
                    [Op.ne]: this.id
                  }
                }
              });

              if (user) {
                throw new Error('Email address already registered.');
              }
            } catch (err) {
              throw new Error(err.message);
            }
          }
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Phone number already registered.'
        },
        validate: {
          notNull: {
            msg: 'Phone number is required.'
          },
          notEmpty: {
            msg: 'Phone number is required.'
          },
          isPhoneNumber(value) {
            if (!isValidPhoneNumber(value)) {
              throw new Error('Phone number is not valid.');
            }
          },
          async isUnique(value) {
            try {
              const user = await User.findOne({
                where: {
                  phone: {
                    [Op.eq]: value
                  },
                  id: {
                    [Op.ne]: this.id
                  }
                }
              });

              if (user) {
                throw new Error('Phone number already registered.');
              }
            } catch (err) {
              throw new Error(err.message);
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [0, 255],
            msg: 'Password too long.'
          },
          notNull: {
            msg: 'Password is required.'
          },
          notEmpty: {
            msg: 'Password is required.'
          }
        }
      },
      profilePhoto: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM('PATIENT', 'DOCTOR'),
        allowNull: false,
        defaultValue: 'PATIENT',
        validate: {
          isIn: {
            args: [['PATIENT', 'DOCTOR']],
            msg: 'Must be PATIENT or DOCTOR'
          }
        }
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            // eslint-disable-next-line no-param-reassign
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    }
  );

  return User;
};
