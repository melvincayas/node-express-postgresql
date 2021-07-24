const express = require("express");
const router = express.Router();
const passport = require("passport");
const userControllers = require("../controllers/user.js");

router
	.route("/signup")
	.get(userControllers.renderSignUp)
	.post(userControllers.signUpNewUser);

router
	.route("/login")
	.get(userControllers.renderLogIn)
	.post(passport.authenticate("local"), userControllers.logUserIn);

router.route("/logout").post(userControllers.logUserOut);

module.exports = router;
