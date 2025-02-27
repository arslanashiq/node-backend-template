const { logout } = require("../../services/auth");
const catch_validation_errors = require("../../utilities/catch_validation_errors");

const logout_user = async (req, res) => {
  try {
    try {
      const { error, message, data } = await logout(req.header("x-sh-auth"));
      if (error) {
        return res.status(400).json({
          success: false,
          message: message,
          data
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully Logged Out",
        ...data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({success:false,message:error.message});
  }
};

module.exports = logout_user;
