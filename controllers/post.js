const db = require("../db");

module.exports.renderEditPage = async (req, res) => {
	const { id } = req.params;

	const result = await db.query("SELECT * FROM posts WHERE post_id = $1", [id]);

	const [postToEdit] = result.rows;

	res.render("edit", { postToEdit });
};

module.exports.addPost = async (req, res, next) => {
	try {
		const { user_id } = req.user;
		const { description } = req.body;

		await db.query(
			"INSERT INTO posts (post_id, description, user_id) VALUES (uuid_generate_v4(), $1, $2)",
			[description, user_id]
		);

		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

module.exports.deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;

		await db.query("DELETE FROM posts WHERE post_id = $1", [id]);

		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

module.exports.editPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { description } = req.body;

		await db.query("UPDATE posts SET description = $1 WHERE post_id = $2", [
			description,
			id,
		]);

		res.redirect("/");
	} catch (err) {
		next(err);
	}
};
