const { Session } = require("../models/session");

//chechkin session auth
const checking_session = async (token) => {
  return await Session.findOne({ token });
};
const get_session_by_user_id = async (user_id) => {
  return await Session.findOne({ user_id });
};

const add_to_session = async (json_token, user_id) => {
  let session = new Session({
    user_id: user_id,
    token: json_token,
  });

  session = await session.save();
  return session;
};

const add_to_session_with_out_id = async (json_token) => {
  let session = new Session({
    token: json_token,
  });
  session = await session.save();
  return session;
};

const delete_from_session = async (id) => {
  return await Session.findByIdAndDelete(id);
};

const find_session_by_token_and_delete = async (token) => {
  return await Session.findOne({ token }).deleteOne();
};

module.exports = {
  add_to_session,
  checking_session,
  get_session_by_user_id,
  delete_from_session,
  add_to_session_with_out_id,
  find_session_by_token_and_delete,
};
