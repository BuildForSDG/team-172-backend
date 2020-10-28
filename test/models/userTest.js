'use strict';

const expect = require('expect');

describe('models/user', function () {
  before(function () {
    // eslint-disable-next-line global-require
    return require('../../src/models').sequelize.sync();
  });

  beforeEach(function () {
    // eslint-disable-next-line global-require
    this.User = require('../../src/models').User;
    this.User.destroy({ truncate: true });
  });

  describe('findAll', function () {
    it('should find records', async function () {
      this.User.findAll().then(function (response) {
        expect(response).toBeInstanceOf(Array);
      });
    });
  });

  describe('create', function () {
    it('creates a user', function () {
      return this.User.create({
        firstName: 'James',
        lastName: 'Mwangi',
        email: 'jamesmwangi@gmail.com',
        phone: '+254712345678',
        password: '123456'
      }).then(function (user) {
        expect(user.firstName).toEqual('James');
        expect(user.lastName).toEqual('Mwangi');
      });
    });
  });
});
