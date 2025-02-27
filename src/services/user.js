const {
  add_user,
  find_user_by_email,
  find_and_delete_user_by_id,
  find_user_by_id_and_update,
} = require("../DAL/user");

//********************************************{Add User}********************************************************/
const _addUser = async (body, resp) => {
  let user = await find_user_by_email(body.email);
  if (user) {
    resp.error = true;
    resp.message = "User Alreay Exist";
    return resp;
  }
  // signup new user
  user = await add_user(body);
  if (!user) {
    resp.error = true;
    resp.message = "Something Went Wrong";
    return resp;
  }
  user = user.toObject();
  delete user.password;
  resp.data = user;
  return resp;
};
const addUser = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _addUser(body, resp);
  return resp;
};

//********************************************{Detail User}********************************************************/
const _detailUser = async (params, resp) => {
  let data = await find_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.message = "User Not Found";
    return resp;
  }
  resp.data = data.toObject();
  return resp;
};
const detailUser = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _detailUser(params, resp);
  return resp;
};

//********************************************{Update User}********************************************************/
const _updateUser = async (params, body, resp) => {
  let data = await find_user_by_id_and_update(params.id || "", body);
  if (!data) {
    resp.error = true;
    resp.message = "User Not Found";
    return resp;
  }
  resp.data = data.toObject();
  return resp;
};
const updateUser = async (params, body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _updateUser(params, body, resp);
  return resp;
};
//********************************************{Update User Password}********************************************************/
const _updateUserPassword = async (body, resp) => {
  let user = await find_user_by_email(params.id || "");

  if (!user) {
    resp.error = true;
    resp.message = "User Not Found";
    return resp;
  }
  const isValidPassword = await bcrypt.compare(body.password, user.password);
  if (!isValidPassword) {
    resp.error = true;
    resp.message = "Password not match";
    return resp;
  }
  const salt = await bcrypt.genSalt(10);
  const newPasswordHash = await bcrypt.hash(body.new_password, salt);
  user.password = newPasswordHash;
  await user.save();
  resp.data = {};
  return resp;
};
const updateUserPassword = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _updateUserPassword(body, resp);
  return resp;
};

//********************************************{List User}********************************************************/
const _listUser = async (params, resp) => {
  let data = await find_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.message = "User Not Found";
    return resp;
  }
  resp.data = data.toObject();
  return resp;
};
const listUser = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _listUser(params, resp);
  return resp;
};

//********************************************{List User}********************************************************/
const _deleteUser = async (params, resp) => {
  let data = await find_and_delete_user_by_id(params.id || "");
  if (!data) {
    resp.error = true;
    resp.message = "User Not Found";
    return resp;
  }
  resp.data = {};
  return resp;
};
const deleteUser = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _deleteUser(params, resp);
  return resp;
};

module.exports = {
  addUser,
  detailUser,
  updateUser,
  listUser,
  deleteUser,
  updateUserPassword,
};
