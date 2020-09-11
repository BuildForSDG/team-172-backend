'use strict';

const { OK, CREATED, ACCEPTED, NO_CONTENT } = require('http-status-codes');
const { check, validationResult } = require('express-validator');
const { Patient } = require('../models');
const { ValidationError, NotFoundError } = require('../errors');

module.exports = {
  async find(req, res, next) {
    try {
      const { id } = req.params;

      if (id) {
        const patient = await Patient.findByPk(id, {
          attributes: { exclude: ['password'] }
        });

        return res.status(OK).json(patient);
      }

      const { rows: patients, count: total } = await Patient.findAndCountAll({
        attributes: { exclude: ['password'] },
        order: [['id', 'DESC']]
      });

      return res.status(OK).json({
        status: true,
        message: 'Patient list retrieved successfully.',
        patients,
        total
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      await check('firstName').not().isEmpty().run(req);
      await check('lastName').not().isEmpty().run(req);
      await check('email').isEmail().run(req);
      await check('phone').isMobilePhone('any').run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError('Failed to add patient', errors.array());
      }

      await Patient.create(req.body);

      res.status(CREATED);
      return res.json({
        status: true,
        message: 'Patient added successfully.'
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;

      const patient = await Patient.findByPk(id);

      if (!patient) {
        throw new NotFoundError(`Patient not found`);
      }

      await check('firstName').not().isEmpty().run(req);
      await check('lastName').not().isEmpty().run(req);
      await check('email').isEmail().run(req);
      await check('phone').isMobilePhone('any').run(req);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError('Failed to update patient', errors.array());
      }

      patient.update(req.body);

      return res.status(ACCEPTED).json({
        status: true,
        message: 'Patient updated successfully.'
      });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      await Patient.destroy({ where: { id } });

      return res.status(NO_CONTENT).json({
        status: true,
        message: 'Patient deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  }
};
