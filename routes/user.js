const express = require("express");
const router = express.Router();
const passport = require("passport");
const user = require("../controllers/user.js");

router.route("/signup").get(user.renderSignUp).post(user.signUpNewUser);

router
	.route("/login")
	.get(user.renderLogIn)
	.post(passport.authenticate("local"), user.logUserIn);

router.route("/logout").post(user.logUserOut);

module.exports = router;
