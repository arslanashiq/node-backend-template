const { login } = require("../../services/auth");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const { login_validation_schema } = require("../../utilities/validation/auth");

const login_user = async (req, res) => {
  try {
    try {
      await login_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await login(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: message,
          data,
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully Logged In",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = login_user;
