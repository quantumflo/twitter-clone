const express = require("express");
const users = require("../controller/users-controller");

const router = express.Router();

router.post("/signup",users.signUp);
router.post("/login",users.login);
router.get("/:uid", users.getUsersNotFollowing )
router.patch("/:uid", users.followUser)

module.exports = router;