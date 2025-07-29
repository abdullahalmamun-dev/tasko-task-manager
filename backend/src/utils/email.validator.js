const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const sanitizeEmail = (email) => {
  return validator.normalizeEmail(email);
};

module.exports = {
  validateEmail,
  sanitizeEmail
};
