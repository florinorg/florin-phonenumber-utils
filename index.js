'use strict';

module.exports.normalizePhoneNumber = function (phoneNumber) {
  // filter all ASCII chars from the string.
  const _phoneNumber = phoneNumber.toString();
  const nonASCIIPhone = _phoneNumber.replace(/[^\x00-\x7F]/g, '');

  const validTokens = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+'];
  let cleanNumber = '';

  const phoneArr = nonASCIIPhone.split('');
  phoneArr.map(token => {
    if (validTokens.indexOf(token) > -1) {
      cleanNumber += token;
    }
  });

  return cleanNumber;
};

/*
@abstract: takes in a number and adds a local prefix to it (if suitable)
@param: a phoneNumber from an address book contact or input from a user
@discussion: number needs to be 'clean' first. It won't registrer
the following: (06)1234556.
*/
module.exports.addPrefixToNumber = function (phoneNumber, prefix) {
  const _phoneNumber = phoneNumber.toString();
  if (!_phoneNumber.length > 0) throw new Error('phoneNumber must have a length > 0');
  if (!prefix) throw new Error('Missing prefix parameter in addPrefixToNumber');

  let numberWithPrefix = phoneNumber;

  // Only works with NL phonenumbers for now, need more declarative solution
  if (_phoneNumber.substring(0, 2) === '06' && prefix) {
    numberWithPrefix = `+316${phoneNumber.substring(2, _phoneNumber.length)}`;
  } else if (_phoneNumber.substring(0, 5) === '+3106') {
    numberWithPrefix = `+316${phoneNumber.substring(5, _phoneNumber.length)}`;
  } else if (_phoneNumber.substring(0, 5) === '00316') {
    numberWithPrefix = `+316${phoneNumber.substring(5, _phoneNumber.length)}`;
  } else if (_phoneNumber.substring(0, 5) === '+0316') {
    numberWithPrefix = `+316${phoneNumber.substring(5, _phoneNumber.length)}`;
  } else if (_phoneNumber.substring(0, 4) === '3106') {
    numberWithPrefix = `+316${phoneNumber.substring(4, _phoneNumber.length)}`;
  }

  return numberWithPrefix;
};
