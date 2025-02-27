const { addUser } = require("../../services/user");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  add_user_validation_schema,
} = require("../../utilities/validation/user");

const add_user = async (req, res) => {
  try {
    try {
      await add_user_validation_schema.validate(req.body, {
        abortEarly: false,
      });

      const { error, message, data } = await addUser(req.body);
      if (error) {
        return res.status(400).json({
          success:false,
          message: message,
        });
      }

      res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ success:false, message: error.message });
  }
};

module.exports = add_user;
