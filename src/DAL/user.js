const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { DEFAULT_PAGE_SIZE_LIMIT } = require("../utilities/constant");

const add_user = async (body) => {
  let user = new User(body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.save();
  return user;
};

const find_user_by_id = async (id) => {
  return await User.findOne({ _id: id }, "-password");
};
const find_and_delete_user_by_id = async (id) => {
  return await User.findByIdAndDelete(id);
};

const find_user_by_email = async (email) => {
  return await User.findOne({ email });
};
const find_all_users = async () => {
  let { page, limit } = query;

  // Default values
  page = parseInt(page) || 1;
  limit = parseInt(limit) || DEFAULT_PAGE_SIZE_LIMIT;
  const skip = (page - 1) * limit;

  return await User.find().select("-password").skip(skip).limit(limit);
};

const find_users_count = async () => {
  return await User.countDocuments();
};

const find_user_by_id_and_update = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true }).select(
    "-password"
  );
};

module.exports = {
  add_user,
  find_user_by_id,
  find_user_by_email,
  find_all_users,
  find_users_count,
  find_and_delete_user_by_id,
  find_user_by_id_and_update,
};
