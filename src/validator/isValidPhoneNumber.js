'use strict';

const { parsePhoneNumberFromString } = require('libphonenumber-js');

const isValidPhoneNumber = (value) => {
  if (!value) {
    return false;
  }

  const phoneNumber = parsePhoneNumberFromString(value);

  if (!phoneNumber) {
    return false;
  }

  return phoneNumber.isValid();
};

exports.default = isValidPhoneNumber;
