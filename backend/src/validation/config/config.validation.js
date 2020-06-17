import Validator from 'validator';
import isEmpty from '../isEmpty';

function validateConfigForm(data) {
  let errors = {};
  data.server_name = !isEmpty(data.server_name) ? data.server_name : '';
  data.automatic_https = !isEmpty(data.automatic_https) ? data.automatic_https : '';
  data.redirect_https = !isEmpty(data.redirect_https) ? data.redirect_https : '';
  data.external_address = !isEmpty(data.external_address) ? data.external_address : '';
  data.external_port = !isEmpty(data.external_port) ? data.external_port : '';
  data.use_dns_verification = !isEmpty(data.use_dns_verification) ? data.use_dns_verification : '';
  data.dns_provider_name = !isEmpty(data.dns_provider_name) ? data.dns_provider_name : '';
  data.dns_api_token = !isEmpty(data.dns_api_token) ? data.dns_api_token : '';
  if (!Validator.isLength(data.server_name, { min: 2, max: 30 })) {
    errors.server_name = 'Server Name must be between 2 and 30 character long';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateConfigForm;