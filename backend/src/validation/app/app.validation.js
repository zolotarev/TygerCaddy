import Validator from 'validator';
import isEmpty from '../isEmpty';

function validateAppForm(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.verify_ssl = !isEmpty(data.verify_ssl) ? data.verify_ssl : '';
  data.websocket = !isEmpty(data.websocket) ? data.websocket : '';
  data.transparent = !isEmpty(data.transparent) ? data.transparent : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 character long';
  }

  if (!Validator.isURL(data.url)) {
    errors.url = 'URL must be a valid URL';
  }

  if (Validator.isEmpty(data.url)) {
    errors.url = 'URL field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAppForm;