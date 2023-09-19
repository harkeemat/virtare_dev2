export const regex = {
  digitWithdecimal: new RegExp(/^\d+(\.\d{1,2})?$/),
  phoneNumber: new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
  usPhoneFormat: new RegExp(/^\(\d{3}\)\s?\d{3}-\d{4}$/),
  onlyNumber: new RegExp(/^[0-9]*$/),
  extension: new RegExp(/^[0-9]{4}$/),
  height: new RegExp(/^[0-9]'(?:\s*(?:1[01]|[0-9])(''|"))?$/),
  zipCode: new RegExp(/^[0-9]{5}$/),
  domainName: new RegExp(/^[a-z0-9_]+$/),
  alphaNumeric: new RegExp('^[a-zA-Z0-9]{12}$'), // limit 12 digit
  emailValidation: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
};
