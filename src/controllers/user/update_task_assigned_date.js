const { updateTaskAsignDate } = require("../../services/user");

const update_task_assigned_date = async (req, res) => {
  try {
    const { error, message, data, status } = await updateTaskAsignDate(
      req.params
    );
    if (error) {
      return res.status(status || 400).json({
        status: status || 400,
        message: message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Task Date Updated",
      data,
    });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = update_task_assigned_date;
