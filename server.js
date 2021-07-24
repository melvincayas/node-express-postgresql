const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const db = require("./db");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", async (req, res, next) => {
	try {
		const { email, password } = req.body;

		bcrypt.hash(password, 12, async (err, hash) => {
			await db.query(
				"INSERT INTO users (user_id, email, password) VALUES (uuid_generate_v4(), $1, $2)",
				[email, hash]
			);
		});

		res.redirect("/");
	} catch (err) {
		next(err);
	}
});

app.use((err, req, res, next) => {
	res.render("error");
});

app.listen(5000, () => {
	console.log("Now listening on Port 5000!");
});
