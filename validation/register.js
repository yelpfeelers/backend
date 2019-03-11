const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  // starts with empty errors
  let errors = {};
  // convert empty item to string because validator doesn't accept empty object
  // if it's not empty return data.etc... else return empty string
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // ordering matteres on which statement will return first

  //check name length
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "username must be between 2 and 30 characterse";
  }
  // check for empty name field
  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }
  // check for empty name field
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "firstname field is required";
  }
  // check for empty name field
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "lastname field is required";
  }
  // check for if email is not valid
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // check for empty email field
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  // check for password length has to be min of 2 and max of 30
  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Password must be between 2 and 30 characterse";
  }

  // check for password and password2 does not match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must matched";
  }

  // check for empty password field
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // check for empty password2 field
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors) // if it's valid it will be empty !valid will popultae the error object with errors
  };
};
