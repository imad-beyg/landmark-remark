const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLocationInput(data) {
  let errors = {};

  data.note = !isEmpty(data.note) ? data.note : "";

  if (!Validator.isLength(data.note, { min: 10, max: 200 })) {
    errors.note = "Note must be between 10 and 200 characters";
  }

  if (Validator.isEmpty(data.note)) {
    errors.note = "Note field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
