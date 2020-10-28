'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Michael',
          lastName: 'Otieno',
          email: 'michaelotieno@gmail.com',
          phone: '+254787654321',
          password: bcrypt.hashSync('123456', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'James',
          lastName: 'Mwangi',
          email: 'jamesmwangi@gmail.com',
          phone: '+254712345678',
          password: bcrypt.hashSync('123456', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
