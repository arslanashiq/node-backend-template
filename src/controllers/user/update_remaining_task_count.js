const { updateRemainingTaskCount } = require("../../services/user");
const catch_validation_errors = require("../../utilities/catch_validation_errors");
const {
  add_user_validation_schema,
} = require("../../utilities/validation/user");

const update_remaining_task_count = async (req, res) => {
  try {
    const { error, message, data, status } = await updateRemainingTaskCount(
      req.params
    );
    if (error) {
      return res.status(status || 400).json({
        status: status || 400,
        message: message,
      });
    }

    res.status(201).json({
      code: 201,
      message: "Task Updated Successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = update_remaining_task_count;
