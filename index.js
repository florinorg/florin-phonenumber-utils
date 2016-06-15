const PhoneNumberUtils = {
  /*
   @abstract: remove all bs like (*&^%^^&*( and more bs
   @param: an array with phone numbers of a contact
   */
  normalizePhoneNumber(phoneNumber) {
    // filter all ASCII chars from the string.
    const _phoneNumber = phoneNumber.toString();
    const nonASCIIPhone = _phoneNumber.replace(/[^\x00-\x7F]/g, '');

    const validTokens = ['0','1','2','3','4','5','6','7','8','9','+'];
    let cleanNumber = '';

    const phoneArr = nonASCIIPhone.split('');
    phoneArr.map(token => {
      if (validTokens.indexOf(token) > -1) {
        cleanNumber += token;
      }
    });

    return cleanNumber;
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
     if (_phoneNumber.substring(0,2) == '06' && prefix) { // accept ints and strings
       numberWithPrefix = `+316${phoneNumber.substring(2, _phoneNumber.length)}`;
     } else if (_phoneNumber.substring(0, 4) == '+3106') { // only works with nl for now, need more declarative solution
       numberWithPrefix = `+316${phoneNumber.substring(4, _phoneNumber.length)}`;
     } else if (_phoneNumber.substring(0,5) == '00316') { // only works with nl for now, need more declarative solution
       numberWithPrefix = `+316${phoneNumber.substring(5, _phoneNumber.length)}`;
     }

     return numberWithPrefix;
  },
};

export default PhoneNumberUtils;
