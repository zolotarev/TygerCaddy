import Validator from 'validator';
import isEmpty from '../isEmpty';

function validateAddressForm(data) {
  let errors = {};
  //console.log(data)
  data.address = !isEmpty(data.address) ? data.address : '';
  data.tls = !isEmpty(data.tls) ? data.tls : '';
  data.staging = !isEmpty(data.staging) ? data.staging : '';

  if (!Validator.isLength(data.address, { min: 2, max: 30 })) {
    errors.url = 'URL must be between 2 and 30 character long';
  }

  if (!Validator.isURL(data.address)) {
    errors.url = 'URL must be a valid URL';
  }

  if (Validator.isEmpty(data.address)) {
    errors.url = 'URL field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAddressForm;