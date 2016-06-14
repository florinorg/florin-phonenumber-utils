const PhoneNumberUtils = {
  /*
   @abstract: remove all bs like (*&^%^^&*( and more bs
   @param: an array with phone numbers of a contact
   */
  normalizePhoneNumber(phoneNumber) {
    // filter all ASCII chars from the string.
    const _phoneNumber = phoneNumber.toString();
    const nonASCIIPhone = _phoneNumber.replace(/[^\x00-\x7F]/g, '');

    const invalidCharset = /([±!@#$%^&*()_§-=`~,./<>?[{}:\;|])/g;
    const normalizePhoneNumber = nonASCIIPhone.replace(invalidCharset, '');

    return normalizePhoneNumber;
  },

  /*
   @abstract: takes in a number and adds a local prefix to it (if suitable)
   @param: a phoneNumber from an address book contact or input from a user
   @discussion: number needs to be 'clean' first. It won't registrer
   the following: (06)1234556.
   */
   addPrefixToNumber(phoneNumber, prefix) {
     const _phoneNumber = phoneNumber.toString();
     if (_phoneNumber.length <= 0) throw new Error('phoneNumber must have a length > 0');

     let numberWithPrefix = phoneNumber;
     if (_phoneNumber[0] == '0' && prefix) { // accept ints and strings
       numberWithPrefix = `+31${phoneNumber.substring(3, _phoneNumber.length)}`;
     } else if (_phoneNumber.substring(0, 4) == '+3106') { // only works with nl for now, need more declarative solution
       numberWithPrefix = `+316${phoneNumber.substring(4, _phoneNumber.length)}`;
     }

     return numberWithPrefix;
  },
};

export default PhoneNumberUtils;
