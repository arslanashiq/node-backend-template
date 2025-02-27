const { updateUserPassword } = require("../../services/user");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  update_user_password_validation_schema,
} = require("../../utilities/validation/user");

const update_user_password = async (req, res) => {
  try {
    try {
      await update_user_password_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await updateUserPassword(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: message,
        });
      }
      res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = update_user_password;
