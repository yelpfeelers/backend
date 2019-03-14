const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function bookmarksValidation(data) {
  const errors = {};

  data.image_url = !isEmpty(data.image_url) ? data.image_url : '';
  data.business_id = !isEmpty(data.business_id) ? data.business_id : '';
  data.name = !isEmpty(data.name) ? data.name : '';



  // business_id
  // name
  // image_url
  // rating

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }
  if (Validator.isEmpty(data.business_id)) {
    errors.business_id = 'business_id field is required';
  }

  if (Validator.isEmpty(data.image_url)) {
    errors.image_url = 'image_url field is required';
  }





  return {
    errors,
    isValid: isEmpty(errors), // if it's valid it will be empty !valid will popultae the error object with errors
  };
};
