module.exports.renderSignUp = (req, res) => {
	res.render("signup");
};

module.exports.signUpNewUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		bcrypt.hash(password, 12, async (err, hash) => {
			if (err) return next(err);

			const result = await db.query(
				"INSERT INTO users (user_id, email, password) VALUES (uuid_generate_v4(), $1, $2) RETURNING *",
				[email, hash]
			);

			const [newUser] = result.rows;

			req.login(newUser, err => {
				if (err) return next(err);

				res.redirect("/");
			});
		});
	} catch (err) {
		next(err);
	}
};

module.exports.renderLogIn = (req, res) => {
	res.render("login");
};

module.exports.logUserIn = (req, res) => {
	res.redirect("/");
};

module.exports.logUserOut = (req, res) => {
	req.logout();
	res.redirect("/");
};
