const { updateBalance } = require("../../services/user");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  update_user_balance_validation_schema,
} = require("../../utilities/validation/user");

const update_balance = async (req, res) => {
  try {
    try {
      await update_user_balance_validation_schema.validate(req.body, {
        abortEarly: false,
      });
      const { error, message, data, status } = await updateBalance(
        req.params,
        req.body
      );
      if (error) {
        return res.status(status || 400).json({
          status: status || 400,
          message: message,
        });
      }

      res.status(201).json({
        code: 201,
        message: "Balance Updated Successfully",
        data,
      });
    } catch (error) {
      catch_validation_errors(res, error);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = update_balance;
