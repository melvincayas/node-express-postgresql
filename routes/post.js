const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/post");

router.route("/").post(postControllers.addPost);

router
	.route("/:id")
	.get(postControllers.renderEditPage)
	.delete(postControllers.deletePost)
	.put(postControllers.editPost);

module.exports = router;
