const bcrypt = require("bcrypt");

const { find_user_by_email } = require("../DAL/user");
const { create_jwt_token, verify_jwt_token } = require("../libs/jsonwebtoken");
const {
  add_to_session,
  find_session_by_token_and_delete,
} = require("../DAL/session");

//********************************************{login user}********************************************************/
const _login = async (body, resp) => {
  let user = await find_user_by_email(body.email);

  if (!user) {
    resp.error = true;
    resp.message = "Invalid Email";
    return resp;
  }

  //   check password

  const isValidPassword = await bcrypt.compare(body.password, user.password);
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
    let session = await find_session_by_token_and_delete(token);

    if (session) {
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
