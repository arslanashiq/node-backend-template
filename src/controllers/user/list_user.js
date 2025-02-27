const { listUser } = require("../../services/user");

const list_user = async (req, res) => {
  try {
    const { error, message, data } = await listUser(req.query);

    if (error) {
      return res.status(400).json({
        success: false,
        message: message,
      });
    }
    res.status(200).json({
      success: true,
      message: "User List",
      data,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = list_user;
