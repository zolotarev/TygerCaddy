import { required, email, max } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend('ip', {
  validate(value){
    if (value) {
      //eslint-disable-next-line
      return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value);
    }

    return false;
  },
  message: 'This value must be a valid IP and Port',
});

extend('domain', {
  validate(value){
    if (value){
      //eslint-disable-next-line
      return /^([a-z0-9]+\.)*[a-z0-9-]+\.[a-z]+/.test(value)
    }
  }
});

extend('port_number', {
  validate(value){
    if (value){
      //eslint-disable-next-line
      return /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(value)
    }
  }
});

extend('passwordMatch', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});