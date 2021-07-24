const db = require("../db");

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
