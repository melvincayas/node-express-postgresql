const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/post");

router.route("/").post(postControllers.addPost);

module.exports = router;
