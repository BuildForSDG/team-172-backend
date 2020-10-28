'use strict';

const bcrypt = require('bcryptjs');
const validator = require('validator');
const {
  OK,
  CREATED,
  ACCEPTED,
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED
} = require('http-status-codes');
const { User } = require('../models');
const jwtService = require('../services/jwt');

module.exports = {
  async find(req, res, next) {
    try {
      const { id } = req.params;

      if (id) {
        const user = await User.findByPk(id, {
          attributes: { exclude: ['password', 'isEnabled'] }
        });

        if (!user) {
          return res.status(NOT_FOUND).json({
            errors: {
              message: 'User not found'
            }
          });
        }

        return res.status(OK).json(user);
      }

      const { rows: users, count: total } = await User.findAndCountAll({
        attributes: { exclude: ['password', 'isEnabled'] },
        order: [['id', 'DESC']]
      });

      return res.status(OK).json({
        status: true,
        message: 'Users list retrieved successfully.',
        users,
        total
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      await User.create(req.body);

      res.status(CREATED);
      return res.json({
        status: true,
        message: 'User added successfully.'
      });
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const obj = {};
        error.errors.forEach((err) => {
          obj[err.path] = err.message;
        });
        return res.status(BAD_REQUEST).json({
          errors: obj
        });
      }
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(NOT_FOUND).json({
          errors: {
            message: 'User not found'
          }
        });
      }

      user.update(req.body);

      return res.status(ACCEPTED).json({
        status: true,
        message: 'User updated successfully.'
      });
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const obj = {};
        error.errors.forEach((err) => {
          obj[err.path] = err.message;
        });
        return res.status(BAD_REQUEST).json({
          errors: obj
        });
      }
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await User.destroy({ where: { id } });

      return res.status(NO_CONTENT).json({
        status: true,
        message: 'User deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const params = req.body;

      // The identifier field is required.
      if (!params.identifier) {
        return res.status(BAD_REQUEST).json({
          errors: {
            identifier: 'Please enter a valid email address or phone number'
          }
        });
      }

      const query = {};

      // Check whether the provided identifier is an email or not.
      const isEmail = validator.isEmail(params.identifier);

      // Set the identifier to the appropriate query field.
      if (isEmail) {
        query.email = params.identifier.toLowerCase();
      } else {
        query.phone = params.identifier;
      }

      // Check whether the user exists.
      const user = await User.findOne({ where: query });

      if (!user) {
        return res.status(BAD_REQUEST).json({
          errors: {
            identifier: 'That account doesn’t exist.'
          }
        });
      }

      // check whether the account is inactive
      if (user.isEnabled === false) {
        return res.status(UNAUTHORIZED).json({
          errors: {
            identifier: 'Your account has been deactivated by an administrator.'
          }
        });
      }

      // The password field is required.
      if (!params.password) {
        return res.status(BAD_REQUEST).json({
          errors: {
            password: 'Please enter your password.'
          }
        });
      }

      // check whether the password is valid
      const validPassword = await bcrypt.compare(
        params.password,
        user.password
      );
      if (!validPassword) {
        return res.status(BAD_REQUEST).json({
          errors: {
            password: 'Your account and/or password is incorrect.'
          }
        });
      }

      return res.status(OK).json({
        token: jwtService.issue({
          id: user.id
        }),
        status: true,
        message: 'User logged in successfully.'
      });
    } catch (error) {
      next(error);
    }
  },

  async me(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password', 'isEnabled'] }
      });

      if (!user) {
        return res.status(NOT_FOUND).json({
          errors: {
            message: 'Account not found'
          }
        });
      }

      return res.status(OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  async revise(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(NOT_FOUND).json({
          errors: {
            message: 'User not found'
          }
        });
      }

      user.update(req.body);

      return res.status(ACCEPTED).json({
        status: true,
        message: 'User updated successfully.'
      });
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const obj = {};
        error.errors.forEach((err) => {
          obj[err.path] = err.message;
        });
        return res.status(BAD_REQUEST).json({
          errors: obj
        });
      }
      next(error);
    }
  }
};
