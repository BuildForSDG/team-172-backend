'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');

const defaultJwtOptions = { expiresIn: '1d' };

module.exports = {
  getToken(req) {
    const params = _.assign({}, req.body, req.query);

    let token = '';

    if (req && req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');

      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        throw new Error(
          'Invalid authorization header format. Format is Authorization: Bearer [token]'
        );
      }
    } else if (params.token) {
      token = params.token;
    } else {
      throw new Error('No authorization header was found');
    }

    return this.verify(token);
  },

  issue(payload, jwtOptions = {}) {
    _.defaults(jwtOptions, defaultJwtOptions);
    return jwt.sign(
      _.clone(payload.toJSON ? payload.toJSON() : payload),
      'secret',
      jwtOptions
    );
  },

  verify(token) {
    return new Promise(function (resolve, reject) {
      jwt.verify(token, 'secret', {}, function (err, tokenPayload = {}) {
        if (err) {
          return reject(new Error('Invalid token.'));
        }
        resolve(tokenPayload);
      });
    });
  }
};
