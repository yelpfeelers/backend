const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function bookmarksValidation(data) {
  const errors = {};

  data.display_phone = !isEmpty(data.display_phone) ? data.display_phone : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.transactions = !isEmpty(data.transactions) ? data.transactions : '';
  data.categories = !isEmpty(data.categories) ? data.categories : '';
  data.image_url = !isEmpty(data.image_url) ? data.image_url : '';
  data.alias = !isEmpty(data.alias) ? data.alias : '';
  data.business_id = !isEmpty(data.business_id) ? data.business_id : '';



  if (Validator.isEmpty(data.business_id)) {
    errors.business_id = 'business_id field is required';
  }
  if (Validator.isEmpty(data.alias)) {
    errors.alias = 'alias field is required';
  }
  if (Validator.isEmpty(data.image_url)) {
    errors.image_url = 'image_url field is required';
  }

  if (Validator.isEmpty(data.categories)) {
    errors.categories = 'categories field is required';
  }

  if (Validator.isEmpty(data.transactions)) {
    errors.transactions = 'transactions field is required';
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = 'price field is required';
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'location field is required';
  }

  if (Validator.isEmpty(data.display_phone)) {
    errors.display_phone = 'display_phone field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors), // if it's valid it will be empty !valid will popultae the error object with errors
  };
};
