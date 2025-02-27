const { get_session_by_user_id } = require("../DAL/session");
const status_code_list = require("../utilities/status_code");
const { verify_jwt_token } = require("../libs/jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.header("x-sh-auth");
  if (!token) {
    res.status(401).send(status_code_list[401]);
  } else {
    try {
      const decoded = verify_jwt_token({ data: token });

      if (decoded?.data?._id) {
        authorized = true;
        const is_session = await get_session_by_user_id(decoded?.data?._id);
        if (!is_session) {
          return res.status(401).send(status_code_list[401]);
        }
        req.user = decoded?.data;
        next();
      } else {
        res.status(401).json(status_code_list[401]);
      }
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  }
};

module.exports = { authenticate };
