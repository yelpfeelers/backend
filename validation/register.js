
const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'username field is required';
  }



  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors), // if it's valid it will be empty !valid will popultae the error object with errors
  };
};
