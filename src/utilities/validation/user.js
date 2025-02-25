const yup = require("yup");

const add_user_validation_schema = yup.object().shape({
  phone_number: yup.string().required(),
  user_name: yup.string().required().min(6).max(100),
  login_password: yup.string().required().min(6).max(100),
  withdrawl_passowrd: yup.string().required().min(6).max(100),
});
const update_user_balance_validation_schema = yup.object().shape({
  balance_amount: yup.string().required(),
});

module.exports = {
  add_user_validation_schema,update_user_balance_validation_schema
};
