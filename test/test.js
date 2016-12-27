const assert = require('chai').assert;
const utils = require('../index.js');

const addPrefixToNumber = utils.addPrefixToNumber;
const normalizePhoneNumber = utils.normalizePhoneNumber;

describe('florin-phonenumber-utils', function() {
  describe('normalizePhoneNumber', function() {
    it('should return a (phone) number with only 1234567890+ as values', function () {
      assert.equal('0031683258760', normalizePhoneNumber('0031 6 (8 3)258-760'));
      assert.equal('+31683258760', normalizePhoneNumber('+31683258760'));
      assert.equal('+31683258760', normalizePhoneNumber('+3^&/.1683±§2587½¼¢60'));
      assert.equal('', normalizePhoneNumber('(*&^%()__?><<<][}||])'))
    });
  });

  describe('addPrefixToNumber', function() {
    it('should return a phone number with a country code prefix', function () {
      assert.equal('+31683258760', addPrefixToNumber('0031683258760', '+31'));
      assert.equal('+31683258760', addPrefixToNumber('+031683258760', '+31'));
      assert.equal('+31683258760', addPrefixToNumber('+31683258760', '+31'));
      assert.equal('+31683258760', addPrefixToNumber('+310683258760', '+31'));
      assert.equal('555555', addPrefixToNumber('555555', '+31'));
    });

    it('should return null when failing', function() {
      assert.equal(null, addPrefixToNumber('', '+31'));
      assert.equal(null, addPrefixToNumber('5355355', ''));
    });
  });
});
