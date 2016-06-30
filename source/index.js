// @flow

export function normalizePhoneNumber(phoneNumber: ?string) {
  // filter all ASCII chars from the string.
  if (!phoneNumber) return null;
  const _phoneNumber = phoneNumber.toString();
  const nonASCIIPhone = _phoneNumber.replace(/[^\x00-\x7F]/g, '');

  // const validTokens = ['0','1','2','3','4','5','6','7','8','9','+'];
  const validTokens = /[0-9+]/;
  let cleanNumber = nonASCIIPhone
    .split('')
    .filter(token => validTokens.test(token))
    //.filter(token => validTokens.indexOf(token) > -1)
    .join('')

  return cleanNumber;
}

/*
@abstract: takes in a number and adds a local prefix to it (if suitable)
@param: a phoneNumber from an address book contact or input from a user
@discussion: number needs to be 'clean' first. It won't registrer
the following: (06)1234556.
*/

const knownPrefixes = [
  '06',
  '+3106',
  '00316',
  '+0316',
]

export function addPrefixToNumber(phoneNumber: ?string, prefix: ?string = '+31') {
  if (phoneNumber == null) return null;
  if (phoneNumber.length === 0) return null;
  if (!prefix) return null;

  const foundPrefix = knownPrefixes.find(prefix => phoneNumber && phoneNumber.indexOf(prefix) === 0);
  if (!foundPrefix) {
    return phoneNumber;
  } else {
    return `${prefix}6${phoneNumber.slice(foundPrefix.length)}`;
  }
}

export function format(phoneNumber: ?string, prefix: ?string) {
  return addPrefixToNumber(normalizePhoneNumber(phoneNumber), prefix);
}
