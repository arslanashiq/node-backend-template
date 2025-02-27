const express = require("express");
const { create_route } = require("../utilities/createRoute");
const add_user = require("../../controllers/user/add_user");
const detail_user = require("../../controllers/user/detail_user");
const list_user = require("../../controllers/user/list_user");
const delete_user = require("../../controllers/user/delete_user");
const update_user = require("../../controllers/user/update_user");
const update_user_password = require("../../controllers/user/update_user_password");

const router = express.Router();

// Define routes and map them to controller functions

create_route({
  router,
  route: "/",
  auth_enable: false,
  post_method: add_user,
});

create_route({
  router,
  route: "/:id",
  auth_enable: true,
  get_method: detail_user,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  put_method: update_user,
});
create_route({
  router,
  route: "/",
  auth_enable: true,
  get_method: list_user,
});
create_route({
  router,
  route: "/:id",
  auth_enable: true,
  delete_method: delete_user,
});

create_route({
  router,
  route: "/",
  auth_enable: true,
  put_method: update_user_password,
});

module.exports = router;
