const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  // starts with empty errors
  const errors = {};
  // convert empty item to string because validator doesn't accept empty object
  // if it's not empty return data.etc... else return empty string
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  // ordering matteres on which statement will return first

  // check name length
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'username must be between 2 and 30 characterse';
  }
  // check for empty username field
  if (Validator.isEmpty(data.username)) {
    errors.username = 'username field is required';
  }


  // check for password length has to be min of 2 and max of 30
  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = 'Password must be between 2 and 30 characterse';
  }


  // check for empty password field
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors), // if it's valid it will be empty !valid will popultae the error object with errors
  };
};
