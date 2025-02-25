const yup = require("yup");

const login_validation_schema = yup.object().shape({
  phone_number: yup.string().required(),
  login_password: yup.string().required().min(6).max(100),
});

module.exports = {
  login_validation_schema,
};
