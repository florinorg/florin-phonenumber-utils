'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizePhoneNumber = normalizePhoneNumber;
exports.addPrefixToNumber = addPrefixToNumber;
function normalizePhoneNumber(phoneNumber) {
  // filter all ASCII chars from the string.
  var _phoneNumber = phoneNumber.toString();
  var nonASCIIPhone = _phoneNumber.replace(/[^\x00-\x7F]/g, '');

  var validTokens = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+'];
  var cleanNumber = '';

  var phoneArr = nonASCIIPhone.split('');
  phoneArr.map(function (token) {
    if (validTokens.indexOf(token) > -1) {
      cleanNumber += token;
    }
  });

  return cleanNumber;
}

/*
@abstract: takes in a number and adds a local prefix to it (if suitable)
@param: a phoneNumber from an address book contact or input from a user
@discussion: number needs to be 'clean' first. It won't registrer
the following: (06)1234556.
*/
function addPrefixToNumber(phoneNumber, prefix) {
  var _phoneNumber = phoneNumber.toString();
  if (_phoneNumber.length <= 0) throw new Error('phoneNumber must have a length > 0');
  if (!prefix) throw new Error('Missing prefix parameter in addPrefixToNumber');

  var numberWithPrefix = phoneNumber;
  if (_phoneNumber.substring(0, 2) == '06' && prefix) {
    // accept ints and strings
    numberWithPrefix = '+316' + phoneNumber.substring(2, _phoneNumber.length);
  } else if (_phoneNumber.substring(0, 5) == '+3106') {
    // only works with nl for now, need more declarative solution
    numberWithPrefix = '+316' + phoneNumber.substring(5, _phoneNumber.length);
  } else if (_phoneNumber.substring(0, 5) == '00316') {
    // only works with nl for now, need more declarative solution
    numberWithPrefix = '+316' + phoneNumber.substring(5, _phoneNumber.length);
  } else if (_phoneNumber.substring(0, 5) === '+0316') {
    numberWithPrefix = '+316' + phoneNumber.substring(5, _phoneNumber.length);
  }

  return numberWithPrefix;
}

