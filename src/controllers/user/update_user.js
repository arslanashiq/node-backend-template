const { updateUser } = require("../../services/user");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  update_user_validation_schema,
} = require("../../utilities/validation/user");

const update_user = async (req, res) => {
  try {
    try {
      await update_user_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await updateUser(req.params, req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: message,
        });
      }
      res.status(200).json({
        success: true,
        message: "User Updated",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = update_user;
