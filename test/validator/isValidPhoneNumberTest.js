'use strict';

const expect = require('expect');
const { isValidPhoneNumber } = require('../../src/validator');

describe('validator/isValidPhoneNumber', function () {
  it('should validate phone numbers', function () {
    expect(isValidPhoneNumber()).toEqual(false);
    expect(isValidPhoneNumber(null)).toEqual(false);
    expect(isValidPhoneNumber('')).toEqual(false);
    expect(isValidPhoneNumber('123')).toEqual(false);
    expect(isValidPhoneNumber('+254')).toEqual(false);
    expect(isValidPhoneNumber('+254712123456')).toEqual(true);
    expect(isValidPhoneNumber('+2549999999999')).toEqual(false);
  });
});
