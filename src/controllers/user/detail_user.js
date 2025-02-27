const {  detailUser } = require("../../services/user");

const detail_user = async (req, res) => {
  try {
      const { error, message, data } = await detailUser(req.params);
      if (error) {
        return res.status(400).json({
          success: false,
          message: message,
        });
      }
      res.status(200).json({
        success: true,
        message: "User Detail",
        data
      });
    
  } catch (error) {
    res.status(400).send({success:false,message:error.message});
  }
};

module.exports = detail_user;
