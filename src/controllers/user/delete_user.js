const { deleteUser } = require("../../services/user");

const delete_user = async (req, res) => {
  try {
    const { error, message, data } = await deleteUser(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: message,
      });
    }
    res.status(204).json({
      success: true,
      message: "User Deleted",
      data,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = delete_user;
