const bcrypt = require("bcrypt");

const { find_user_by_email } = require("../DAL/user");
const { create_jwt_token, verify_jwt_token } = require("../libs/jsonwebtoken");
const {
  add_to_session,
  delete_from_session_by_user_id,
} = require("../DAL/session");

//********************************************{login user}********************************************************/
const _login = async (body, resp) => {
  let user = await find_user_by_email(body.phone_number);

  if (!user) {
    resp.error = true;
    resp.message = "Invalid Phone Number";
    return resp;
  }

  //   check password

  const isValidPassword = await bcrypt.compare(
    body.password,
    user.password
  );
  if (!isValidPassword) {
    resp.error = true;
    resp.message = "Invalid Password";
    return resp;
  }

  user = user.toObject();
  delete user.password;

  const token = create_jwt_token({ data: user });
  await add_to_session(token, user._id);
  resp.data = { user, token };
  return resp;
};
const login = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _login(body, resp);
  return resp;
};

//********************************************{logout user}********************************************************/
const _logout = async (token, resp) => {
  const decoded = verify_jwt_token({ data: token });
  if (decoded?.data?._id) {
    let session = await delete_from_session_by_user_id(decoded?.data?._id);

    if (session?.acknowledged) {
      resp.message = "Successfully Logout";
      return resp;
    }
  }

  resp.error = true;
  resp.message = "Somthing Went Wrong";
  return resp;
};
const logout = async (token) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _logout(token, resp);
  return resp;
};

module.exports = { login, logout };
