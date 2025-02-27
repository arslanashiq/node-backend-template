const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    default: "",
  },
});

userSchema.plugin(timestamps);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const userJson = _.pick(userObject, [
    "_id",
    "name",
    "email",
    "password",
    "createdAt",
    "updatedAt",
  ]);
  return userJson;
};
const User = mongoose.model("user", userSchema);
module.exports = { User };
