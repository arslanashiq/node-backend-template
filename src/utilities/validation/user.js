const yup = require("yup");

const add_user_validation_schema = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(3).max(100).required(),
  })
  .strict()
  .noUnknown(true, ({ unknown }) => `${unknown.join(", ")} not allowded`);

const update_user_validation_schema = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email().required(),
  })
  .strict()
  .noUnknown(true, ({ unknown }) => `${unknown.join(", ")} not allowded`);

const update_user_password_validation_schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(100).required(),
    new_password: yup.string().min(3).max(100).required(),
  })
  .strict()
  .noUnknown(true, ({ unknown }) => `${unknown.join(", ")} not allowded`);

module.exports = {
  add_user_validation_schema,
  update_user_validation_schema,
  update_user_password_validation_schema,
};
