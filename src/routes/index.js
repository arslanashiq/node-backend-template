const express = require("express");
const router = express.Router();

const authRoutes = require("./v1/authRoutes");
const userRutes = require("./v1/userRutes");

router.use("/auth", authRoutes);
router.use("/user", userRutes);

module.exports = router;
